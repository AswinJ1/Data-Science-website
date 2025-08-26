import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export function ContactInfo() {
  return (
    <div className="space-y-6">
      <Card className="bg-card border-border">
        <CardHeader>
          <CardTitle className="text-xl text-primary">Contact Information</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <h3 className="font-medium text-foreground mb-1">Email</h3>
            <p className="text-muted-foreground">hello@company.com</p>
          </div>
          <div>
            <h3 className="font-medium text-foreground mb-1">Phone</h3>
            <p className="text-muted-foreground">+1 (555) 123-4567</p>
          </div>
          <div>
            <h3 className="font-medium text-foreground mb-1">Address</h3>
            <p className="text-muted-foreground">
              123 Business Street
              <br />
              Suite 100
              <br />
              City, State 12345
            </p>
          </div>
        </CardContent>
      </Card>

      <Card className="bg-card border-border">
        <CardHeader>
          <CardTitle className="text-xl text-primary">Business Hours</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          <div className="flex justify-between">
            <span className="text-foreground">Monday - Friday</span>
            <span className="text-muted-foreground">9:00 AM - 6:00 PM</span>
          </div>
          <div className="flex justify-between">
            <span className="text-foreground">Saturday</span>
            <span className="text-muted-foreground">10:00 AM - 4:00 PM</span>
          </div>
          <div className="flex justify-between">
            <span className="text-foreground">Sunday</span>
            <span className="text-muted-foreground">Closed</span>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
