import { Download, TrendingUp, Users, Zap } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { MetricCard } from "@/components/MetricCard";

export default function Analytics() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Analytics & Reports</h1>
          <p className="text-muted-foreground">Comprehensive data insights and performance metrics</p>
        </div>
        <Button className="gap-2">
          <Download className="h-4 w-4" />
          Export Report
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <MetricCard
          title="Energy Saved"
          value="1,847 kWh"
          icon={Zap}
          trend={{ value: "18% vs last month", isPositive: true }}
          variant="success"
        />

        <MetricCard
          title="Average Attendance"
          value="2,341"
          icon={Users}
          trend={{ value: "5% vs last week", isPositive: true }}
          variant="default"
        />

        <MetricCard
          title="Cost Savings"
          value="$12,450"
          icon={TrendingUp}
          trend={{ value: "$2,100 this month", isPositive: true }}
          variant="success"
        />
      </div>

      <Tabs defaultValue="occupancy" className="space-y-6">
        <TabsList>
          <TabsTrigger value="occupancy">Occupancy</TabsTrigger>
          <TabsTrigger value="energy">Energy</TabsTrigger>
          <TabsTrigger value="environment">Environment</TabsTrigger>
        </TabsList>

        {/* OCCUPANCY SECTION */}
        <TabsContent value="occupancy" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Occupancy Trends</CardTitle>
              <CardDescription>Room utilization over the past 30 days</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-80 bg-muted/50 rounded-lg flex items-center justify-center">
                <p className="text-muted-foreground">Occupancy chart visualization</p>
              </div>
            </CardContent>
          </Card>

          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Peak Hours Analysis</CardTitle>
                <CardDescription>Busiest times across campus</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {[
                    { time: "9:00 - 10:00 AM", occupancy: "92%" },
                    { time: "11:00 AM - 12:00 PM", occupancy: "88%" },
                    { time: "2:00 - 3:00 PM", occupancy: "85%" },
                    { time: "3:00 - 4:00 PM", occupancy: "78%" },
                  ].map((slot, i) => (
                    <div key={i} className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                      <span className="text-sm font-medium">{slot.time}</span>
                      <span className="text-sm text-primary font-semibold">{slot.occupancy}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Building Comparison</CardTitle>
                <CardDescription>Average utilization by building</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {[
                    { building: "Building A", rate: "78%" },
                    { building: "Building B", rate: "65%" },
                    { building: "Building C", rate: "82%" },
                    { building: "Library", rate: "71%" },
                  ].map((item, i) => (
                    <div key={i} className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                      <span className="text-sm font-medium">{item.building}</span>
                      <span className="text-sm text-accent font-semibold">{item.rate}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* ENERGY SECTION */}
        <TabsContent value="energy" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Energy Consumption</CardTitle>
              <CardDescription>Monthly usage patterns</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-80 bg-muted/50 rounded-lg flex items-center justify-center">
                <p className="text-muted-foreground">Energy consumption chart</p>
              </div>
            </CardContent>
          </Card>

          <div className="grid gap-4 md:grid-cols-3">
            <Card>
              <CardHeader><CardTitle className="text-lg">Total Consumption</CardTitle></CardHeader>
              <CardContent>
                <p className="text-3xl font-bold">45,892 kWh</p>
                <p className="text-sm text-muted-foreground mt-1">This month</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader><CardTitle className="text-lg">Cost</CardTitle></CardHeader>
              <CardContent>
                <p className="text-3xl font-bold">$6,884</p>
                <p className="text-sm text-success mt-1">↓ 12% from last month</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader><CardTitle className="text-lg">Efficiency Score</CardTitle></CardHeader>
              <CardContent>
                <p className="text-3xl font-bold">87/100</p>
                <p className="text-sm text-success mt-1">↑ 5 points improved</p>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* ENVIRONMENT SECTION */}
        <TabsContent value="environment" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Environmental Conditions</CardTitle>
              <CardDescription>Temperature and humidity trends</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-80 bg-muted/50 rounded-lg flex items-center justify-center">
                <p className="text-muted-foreground">Environmental data chart</p>
              </div>
            </CardContent>
          </Card>

          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Air Quality Index</CardTitle>
                <CardDescription>Current readings across campus</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {[
                    { location: "Building A", aqi: "Good", value: 45 },
                    { location: "Building B", aqi: "Good", value: 52 },
                    { location: "Building C", aqi: "Moderate", value: 68 },
                    { location: "Library", aqi: "Good", value: 42 },
                  ].map((item, i) => (
                    <div key={i} className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                      <span className="text-sm font-medium">{item.location}</span>
                      <div className="flex items-center gap-2">
                        <span className="text-sm">{item.value}</span>
                        <span className="text-xs text-success">{item.aqi}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Comfort Index</CardTitle>
                <CardDescription>Temperature & humidity comfort levels</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="p-4 rounded-lg bg-success/10 border border-success/20 text-center">
                    <p className="text-2xl font-bold text-success">Optimal</p>
                    <p className="text-sm text-muted-foreground mt-1">92% of spaces</p>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div className="p-3 rounded-lg bg-muted/50 text-center">
                      <p className="text-lg font-bold">22.5°C</p>
                      <p className="text-xs text-muted-foreground">Avg Temp</p>
                    </div>
                    <div className="p-3 rounded-lg bg-muted/50 text-center">
                      <p className="text-lg font-bold">46%</p>
                      <p className="text-xs text-muted-foreground">Avg Humidity</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

      </Tabs>
    </div>
  );
}
