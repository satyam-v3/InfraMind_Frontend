import { HelpCircle, BookOpen, MessageCircle, Mail, ExternalLink } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export default function Help() {
  return (
    <div className="space-y-6">
      {/* PAGE HEADER */}
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Help & Support</h1>
        <p className="text-muted-foreground">Find answers and get assistance</p>
      </div>

      {/* HELP OPTIONS */}
      <div className="grid gap-6 md:grid-cols-3">

        {/* DOCUMENTATION CARD */}
        <Card className="hover:shadow-lg transition-shadow">
          <CardHeader>
            <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mb-2">
              <BookOpen className="h-6 w-6 text-primary" />
            </div>
            <CardTitle>Documentation</CardTitle>
            <CardDescription>Comprehensive guides and tutorials</CardDescription>
          </CardHeader>
          <CardContent>
            <Button variant="outline" className="w-full gap-2">
              View Docs
              <ExternalLink className="h-4 w-4" />
            </Button>
          </CardContent>
        </Card>

        {/* LIVE CHAT */}
        <Card className="hover:shadow-lg transition-shadow">
          <CardHeader>
            <div className="h-12 w-12 rounded-lg bg-accent/10 flex items-center justify-center mb-2">
              <MessageCircle className="h-6 w-6 text-accent" />
            </div>
            <CardTitle>Live Chat</CardTitle>
            <CardDescription>Chat with our support team</CardDescription>
          </CardHeader>
          <CardContent>
            <Button variant="outline" className="w-full gap-2">
              Start Chat
              <MessageCircle className="h-4 w-4" />
            </Button>
          </CardContent>
        </Card>

        {/* EMAIL SUPPORT */}
        <Card className="hover:shadow-lg transition-shadow">
          <CardHeader>
            <div className="h-12 w-12 rounded-lg bg-success/10 flex items-center justify-center mb-2">
              <Mail className="h-6 w-6 text-success" />
            </div>
            <CardTitle>Email Support</CardTitle>
            <CardDescription>Get help via email within 24h</CardDescription>
          </CardHeader>
          <CardContent>
            <Button variant="outline" className="w-full gap-2">
              Send Email
              <Mail className="h-4 w-4" />
            </Button>
          </CardContent>
        </Card>

      </div>

      {/* FAQ SECTION */}
      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <HelpCircle className="h-5 w-5 text-primary" />
            <CardTitle>Frequently Asked Questions</CardTitle>
          </div>
          <CardDescription>Quick answers to common questions</CardDescription>
        </CardHeader>

        <CardContent>
          <Accordion type="single" collapsible className="w-full">

            <AccordionItem value="item-1">
              <AccordionTrigger>How do I add a new room to the system?</AccordionTrigger>
              <AccordionContent>
                Navigate to the Rooms page and click the "Add Room" button. Fill in the required details like room name, building, floor, and capacity.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-2">
              <AccordionTrigger>How do I configure alert thresholds?</AccordionTrigger>
              <AccordionContent>
                Go to Settings → Sensors tab. You can set the minimum and maximum values for temperature, humidity, and occupancy there.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-3">
              <AccordionTrigger>Can I export analytics data?</AccordionTrigger>
              <AccordionContent>
                Yes! Visit the Analytics page and click "Export Report". You can download CSV or Excel formats.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-4">
              <AccordionTrigger>How do I manage user permissions?</AccordionTrigger>
              <AccordionContent>
                Use the User Management page to control user roles like Admin, Manager, Operator, and Viewer.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-5">
              <AccordionTrigger>What should I do if a sensor goes offline?</AccordionTrigger>
              <AccordionContent>
                Check the Sensor Management page, verify power & connectivity, and recalibrate or replace if needed.
              </AccordionContent>
            </AccordionItem>

          </Accordion>
        </CardContent>
      </Card>

      {/* CONTACT FORM */}
      <Card>
        <CardHeader>
          <CardTitle>Contact Support</CardTitle>
          <CardDescription>Send us a message and we'll respond soon</CardDescription>
        </CardHeader>

        <CardContent>
          <form className="space-y-4">

            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="name">Name</Label>
                <Input id="name" placeholder="Your name" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" placeholder="your.email@campus.edu" />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="subject">Subject</Label>
              <Input id="subject" placeholder="What do you need help with?" />
            </div>

            <div className="space-y-2">
              <Label htmlFor="message">Message</Label>
              <Textarea id="message" placeholder="Describe your problem..." rows={6} />
            </div>

            <Button className="w-full">Submit Request</Button>

          </form>
        </CardContent>
      </Card>

    </div>
  );
}
