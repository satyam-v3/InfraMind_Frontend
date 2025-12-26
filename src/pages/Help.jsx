import { useState } from "react";
import {
  HelpCircle,
  BookOpen,
  MessageCircle,
  Mail,
  ExternalLink,
} from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export default function Help() {
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    setTimeout(() => {
      setLoading(false);
      toast.success("Support request submitted successfully");
      e.target.reset();
    }, 800);
  };

  return (
    <div className="space-y-6">
      {/* PAGE HEADER */}
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Help & Support</h1>
        <p className="text-muted-foreground">
          Find answers and get assistance
        </p>
      </div>

      {/* QUICK HELP OPTIONS */}
      <div className="grid gap-6 md:grid-cols-3">
        <Card>
          <CardHeader>
            <BookOpen className="h-6 w-6 text-primary mb-2" />
            <CardTitle>Documentation</CardTitle>
            <CardDescription>
              Guides, setup steps and system usage
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button
              variant="outline"
              className="w-full gap-2"
              onClick={() => window.open("https://github.com", "_blank")}
            >
              View Docs <ExternalLink className="h-4 w-4" />
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <MessageCircle className="h-6 w-6 text-accent mb-2" />
            <CardTitle>Live Chat</CardTitle>
            <CardDescription>
              Chat with the system administrator
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button
              variant="outline"
              className="w-full"
              onClick={() =>
                toast.info("Live chat will be enabled in next phase")
              }
            >
              Start Chat
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <Mail className="h-6 w-6 text-success mb-2" />
            <CardTitle>Email Support</CardTitle>
            <CardDescription>
              Get help via email within 24 hours
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button
              variant="outline"
              className="w-full"
              onClick={() =>
                window.open("mailto:support@inframind.ai")
              }
            >
              Send Email
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* FAQ */}
      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <HelpCircle className="h-5 w-5 text-primary" />
            <CardTitle>Frequently Asked Questions</CardTitle>
          </div>
        </CardHeader>

        <CardContent>
          <Accordion type="single" collapsible>
            <AccordionItem value="1">
              <AccordionTrigger>
                How does sensor data reach the dashboard?
              </AccordionTrigger>
              <AccordionContent>
                Sensor data flows from ESP32 → MQTT → Backend → WebSockets → UI
                in real-time.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="2">
              <AccordionTrigger>
                What happens if a sensor goes offline?
              </AccordionTrigger>
              <AccordionContent>
                The system raises an alert automatically after inactivity
                thresholds are crossed.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="3">
              <AccordionTrigger>
                Can I control devices remotely?
              </AccordionTrigger>
              <AccordionContent>
                Yes. Lights and fans can be toggled from the Rooms page using
                MQTT commands.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="4">
              <AccordionTrigger>
                Is the data stored historically?
              </AccordionTrigger>
              <AccordionContent>
                Yes. Sensor readings are stored in MongoDB and can be used for
                analytics.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </CardContent>
      </Card>

      {/* CONTACT FORM */}
      <Card>
        <CardHeader>
          <CardTitle>Contact Support</CardTitle>
          <CardDescription>
            Send a message to the InfraMind team
          </CardDescription>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2">
              <div>
                <Label>Name</Label>
                <Input required placeholder="Your name" />
              </div>

              <div>
                <Label>Email</Label>
                <Input required type="email" placeholder="you@example.com" />
              </div>
            </div>

            <div>
              <Label>Subject</Label>
              <Input required placeholder="Issue subject" />
            </div>

            <div>
              <Label>Message</Label>
              <Textarea
                required
                rows={5}
                placeholder="Describe the issue..."
              />
            </div>

            <Button disabled={loading} className="w-full">
              {loading ? "Sending..." : "Submit Request"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
