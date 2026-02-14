import { NextResponse } from "next/server";
import { requireAdmin } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function GET(request: Request) {
  try {
    await requireAdmin();

    const { searchParams } = new URL(request.url);
    const period = searchParams.get("period") || "6m"; // 7d, 30d, 3m, 6m, 1y, all
    const fromParam = searchParams.get("from");
    const toParam = searchParams.get("to");

    // Calculate date range
    let dateFrom: Date | undefined;
    let dateTo: Date = new Date();

    if (fromParam && toParam) {
      dateFrom = new Date(fromParam);
      dateTo = new Date(toParam);
      dateTo.setHours(23, 59, 59, 999);
    } else {
      const now = new Date();
      switch (period) {
        case "7d":
          dateFrom = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
          break;
        case "30d":
          dateFrom = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
          break;
        case "3m":
          dateFrom = new Date(now.getFullYear(), now.getMonth() - 3, now.getDate());
          break;
        case "6m":
          dateFrom = new Date(now.getFullYear(), now.getMonth() - 6, now.getDate());
          break;
        case "1y":
          dateFrom = new Date(now.getFullYear() - 1, now.getMonth(), now.getDate());
          break;
        case "all":
          dateFrom = undefined;
          break;
        default:
          dateFrom = new Date(now.getFullYear(), now.getMonth() - 6, now.getDate());
      }
    }

    const dateFilter = dateFrom
      ? { createdAt: { gte: dateFrom, lte: dateTo } }
      : {};

    // Determine grouping format based on range span
    const spanDays = dateFrom
      ? Math.ceil((dateTo.getTime() - dateFrom.getTime()) / (1000 * 60 * 60 * 24))
      : 365;
    const groupByDay = spanDays <= 31;

    // Build the SQL interval for the time-series query
    const intervalSql = dateFrom
      ? groupByDay
        ? `TO_CHAR("createdAt", 'YYYY-MM-DD')`
        : `TO_CHAR("createdAt", 'YYYY-MM')`
      : `TO_CHAR("createdAt", 'YYYY-MM')`;

    // Run all queries in parallel
    const [
      totalUsers,
      totalJobs,
      activeJobs,
      totalApplications,
      filteredApplications,
      totalBlogs,
      publishedBlogs,
      totalCategories,
      applicationsByStatus,
      applicationsByTime,
      jobsByType,
      blogsByCategory,
      blogsByTime,
      usersByTime,
      recentApplications,
      recentBlogs,
      topJobs,
    ] = await Promise.all([
      // Global counts (always total)
      prisma.user.count({ where: { role: "APPLICANT" } }),
      prisma.job.count(),
      prisma.job.count({ where: { isActive: true } }),
      prisma.application.count(),
      // Filtered count
      prisma.application.count({ where: dateFilter }),
      prisma.blog.count(),
      prisma.blog.count({ where: { status: "PUBLISHED" } }),
      prisma.category.count(),

      // Applications grouped by status (filtered)
      prisma.application.groupBy({
        by: ["status"],
        where: dateFilter,
        _count: { status: true },
      }),

      // Applications over time (filtered)
      dateFrom
        ? prisma.$queryRawUnsafe(
            `SELECT ${intervalSql} as period, COUNT(*)::int as count
             FROM applications
             WHERE "createdAt" >= $1 AND "createdAt" <= $2
             GROUP BY ${intervalSql}
             ORDER BY period ASC`,
            dateFrom,
            dateTo
          )
        : prisma.$queryRaw`
            SELECT TO_CHAR("createdAt", 'YYYY-MM') as period, COUNT(*)::int as count
            FROM applications
            GROUP BY TO_CHAR("createdAt", 'YYYY-MM')
            ORDER BY period ASC
          `,

      // Jobs grouped by type
      prisma.job.groupBy({
        by: ["type"],
        where: dateFilter,
        _count: { type: true },
      }),

      // Blogs by category (filtered)
      prisma.blog.groupBy({
        by: ["categoryId"],
        where: dateFilter,
        _count: { categoryId: true },
      }),

      // Blogs over time (filtered)
      dateFrom
        ? prisma.$queryRawUnsafe(
            `SELECT ${intervalSql.replace(/applications/g, "blogs").replace(/"createdAt"/g, '"createdAt"')} as period, COUNT(*)::int as count
             FROM blogs
             WHERE "createdAt" >= $1 AND "createdAt" <= $2
             GROUP BY ${intervalSql}
             ORDER BY period ASC`,
            dateFrom,
            dateTo
          )
        : prisma.$queryRaw`
            SELECT TO_CHAR("createdAt", 'YYYY-MM') as period, COUNT(*)::int as count
            FROM blogs
            GROUP BY TO_CHAR("createdAt", 'YYYY-MM')
            ORDER BY period ASC
          `,

      // Users over time (filtered)
      dateFrom
        ? prisma.$queryRawUnsafe(
            `SELECT ${intervalSql.replace(/applications/g, "users")} as period, COUNT(*)::int as count
             FROM users
             WHERE role = 'APPLICANT' AND "createdAt" >= $1 AND "createdAt" <= $2
             GROUP BY ${intervalSql}
             ORDER BY period ASC`,
            dateFrom,
            dateTo
          )
        : prisma.$queryRaw`
            SELECT TO_CHAR("createdAt", 'YYYY-MM') as period, COUNT(*)::int as count
            FROM users
            WHERE role = 'APPLICANT'
            GROUP BY TO_CHAR("createdAt", 'YYYY-MM')
            ORDER BY period ASC
          `,

      // Recent 5 applications
      prisma.application.findMany({
        take: 5,
        orderBy: { createdAt: "desc" },
        where: dateFilter,
        include: {
          user: { select: { name: true, email: true } },
          job: { select: { title: true } },
        },
      }),

      // Recent 5 blogs
      prisma.blog.findMany({
        take: 5,
        orderBy: { createdAt: "desc" },
        where: dateFilter,
        select: {
          id: true,
          title: true,
          status: true,
          publishedAt: true,
          createdAt: true,
          author: { select: { name: true } },
          category: { select: { name: true } },
        },
      }),

      // Top jobs by application count (filtered)
      prisma.job.findMany({
        take: 5,
        where: dateFilter,
        select: {
          id: true,
          title: true,
          type: true,
          isActive: true,
          _count: { select: { applications: true } },
        },
        orderBy: { applications: { _count: "desc" } },
      }),
    ]);

    // Resolve category names for blogsByCategory
    const categoryIds = blogsByCategory.map((b) => b.categoryId);
    const categories = categoryIds.length
      ? await prisma.category.findMany({
          where: { id: { in: categoryIds } },
          select: { id: true, name: true },
        })
      : [];
    const categoryMap = Object.fromEntries(categories.map((c) => [c.id, c.name]));

    // Format applicationsByStatus
    const statusData = applicationsByStatus.map((s) => ({
      name: s.status.replace(/_/g, " "),
      value: s._count.status,
    }));

    // Format jobsByType
    const typeData = jobsByType.map((j) => ({
      name: j.type.replace(/_/g, " "),
      value: j._count.type,
    }));

    // Format blogsByCategory
    const blogCategoryData = blogsByCategory.map((b) => ({
      name: categoryMap[b.categoryId] || "Unknown",
      value: b._count.categoryId,
    }));

    // Fill periods
    const filledApplications = fillPeriods(applicationsByTime as any[], dateFrom, dateTo, groupByDay);
    const filledBlogs = fillPeriods(blogsByTime as any[], dateFrom, dateTo, groupByDay);
    const filledUsers = fillPeriods(usersByTime as any[], dateFrom, dateTo, groupByDay);

    return NextResponse.json({
      overview: {
        totalUsers,
        totalJobs,
        activeJobs,
        totalApplications,
        filteredApplications,
        totalBlogs,
        publishedBlogs,
        totalCategories,
      },
      charts: {
        applicationsByStatus: statusData,
        applicationsByTime: filledApplications,
        blogsByTime: filledBlogs,
        usersByTime: filledUsers,
        jobsByType: typeData,
        blogsByCategory: blogCategoryData,
      },
      recentApplications,
      recentBlogs,
      topJobs: topJobs.map((j) => ({
        id: j.id,
        title: j.title,
        type: j.type,
        isActive: j.isActive,
        applications: j._count.applications,
      })),
      meta: {
        period,
        dateFrom: dateFrom?.toISOString() || null,
        dateTo: dateTo.toISOString(),
        groupByDay,
      },
    });
  } catch (error) {
    console.error("Analytics error:", error);
    return NextResponse.json({ error: "Failed to load analytics" }, { status: 500 });
  }
}

function fillPeriods(
  data: { period: string; count: number }[],
  dateFrom: Date | undefined,
  dateTo: Date,
  groupByDay: boolean
) {
  const periods: { period: string; label: string; count: number }[] = [];

  if (!dateFrom) {
    // "all" — just return what we have with labels
    return data.map((d) => {
      const [y, m] = d.period.split("-");
      const dt = new Date(parseInt(y), parseInt(m) - 1, 1);
      return {
        period: d.period,
        label: dt.toLocaleDateString("en-US", { month: "short", year: "numeric" }),
        count: d.count,
      };
    });
  }

  if (groupByDay) {
    const cursor = new Date(dateFrom);
    cursor.setHours(0, 0, 0, 0);
    const end = new Date(dateTo);
    end.setHours(0, 0, 0, 0);

    while (cursor <= end) {
      const key = cursor.toISOString().slice(0, 10); // YYYY-MM-DD
      const label = cursor.toLocaleDateString("en-US", { month: "short", day: "numeric" });
      const existing = data.find((r) => r.period === key);
      periods.push({ period: key, label, count: existing?.count ?? 0 });
      cursor.setDate(cursor.getDate() + 1);
    }
  } else {
    const cursor = new Date(dateFrom.getFullYear(), dateFrom.getMonth(), 1);
    const endMonth = new Date(dateTo.getFullYear(), dateTo.getMonth(), 1);

    while (cursor <= endMonth) {
      const key = `${cursor.getFullYear()}-${String(cursor.getMonth() + 1).padStart(2, "0")}`;
      const label = cursor.toLocaleDateString("en-US", { month: "short", year: "numeric" });
      const existing = data.find((r) => r.period === key);
      periods.push({ period: key, label, count: existing?.count ?? 0 });
      cursor.setMonth(cursor.getMonth() + 1);
    }
  }

  return periods;
}
