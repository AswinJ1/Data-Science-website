'use client'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Home, ArrowLeft, Search } from 'lucide-react'

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 flex items-center justify-center px-4">
      <div className="max-w-4xl mx-auto text-center">
        <div className="mb-8">
          {/* 404 Image/Illustration */}
            <img
                src="/not.png"
                alt="Page Not Found"
                className="mx-auto h-48 w-48 md:h-64 md:w-64"
            />
        </div>

        {/* Error Message */}
        <div className="mb-8">
          <h1 className="text-3xl md:text-5xl font-bold text-slate-900 mb-4">
            Page Not Found
          </h1>
          <p className="text-lg md:text-xl text-slate-600 mb-2">
            Oops! The data you're looking for seems to have gone missing.
          </p>
          <p className="text-slate-500">
            The page you requested doesn't exist or may have been moved to a new location.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Link href="/">
            <Button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg flex items-center gap-2">
              <Home className="w-4 h-4" />
              Back to Home
            </Button>
          </Link>
          
          <Button 
            variant="outline" 
            onClick={() => window.history.back()}
            className="border-slate-300 text-slate-700 hover:bg-slate-50 px-6 py-3 rounded-lg flex items-center gap-2"
          >
            <ArrowLeft className="w-4 h-4" />
            Go Back
          </Button>
        </div>

      </div>
    </div>
  )
}