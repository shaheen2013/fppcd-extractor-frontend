"use client";

import * as React from "react";
import { TrendingUp, FileText, CheckCircle, Clock, Users2 } from "lucide-react";
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Line,
  LineChart,
  XAxis,
} from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

const chartData = [
  { month: "January", applications: 186, approved: 120, rejected: 45 },
  { month: "February", applications: 305, approved: 220, rejected: 60 },
  { month: "March", applications: 237, approved: 180, rejected: 40 },
  { month: "April", applications: 273, approved: 200, rejected: 50 },
  { month: "May", applications: 209, approved: 150, rejected: 42 },
  { month: "June", applications: 314, approved: 240, rejected: 55 },
];

const chartConfig = {
  applications: {
    label: "Applications",
    color: "#3b82f6",
  },
  approved: {
    label: "Approved",
    color: "#3b82f6",
  },
  rejected: {
    label: "Rejected",
    color: "#60a5fa",
  },
} satisfies ChartConfig;

export default function AdminDashboard() {
  return (
    <div className="flex-1 space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
      </div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Total Applications
            </CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1,524</div>
            <p className="text-xs text-muted-foreground">
              +20.1% from last month
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Approved</CardTitle>
            <CheckCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1,110</div>
            <p className="text-xs text-muted-foreground">72.8% approval rate</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">122</div>
            <p className="text-xs text-muted-foreground">Awaiting review</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Users</CardTitle>
            <Users2 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">573</div>
            <p className="text-xs text-muted-foreground">
              +201 since last week
            </p>
          </CardContent>
        </Card>
      </div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <Card className="col-span-4">
          <CardHeader>
            <CardTitle>Applications Overview</CardTitle>
          </CardHeader>
          <CardContent className="pl-2">
            <ChartContainer config={chartConfig}>
              <AreaChart
                accessibilityLayer
                data={chartData}
                margin={{
                  left: 12,
                  right: 12,
                }}
              >
                <CartesianGrid vertical={false} />
                <XAxis
                  dataKey="month"
                  tickLine={false}
                  axisLine={false}
                  tickMargin={8}
                  tickFormatter={(value) => value.slice(0, 3)}
                />
                <ChartTooltip
                  cursor={false}
                  content={(props) => <ChartTooltipContent {...props} indicator="dot" />}
                />
                <Area
                  dataKey="approved"
                  type="natural"
                  fill="var(--color-approved)"
                  fillOpacity={0.4}
                  stroke="var(--color-approved)"
                  stackId="a"
                />
                <Area
                  dataKey="rejected"
                  type="natural"
                  fill="var(--color-rejected)"
                  fillOpacity={0.4}
                  stroke="var(--color-rejected)"
                  stackId="a"
                />
              </AreaChart>
            </ChartContainer>
          </CardContent>
        </Card>
        <Card className="col-span-3">
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
            <CardDescription>Latest application submissions</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-8">
              <div className="flex items-center">
                <div className="ml-4 space-y-1">
                  <p className="text-sm font-medium leading-none">
                    Heritage Building Application
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Submitted 2 hours ago
                  </p>
                </div>
                <div className="ml-auto font-medium">Pending</div>
              </div>
              <div className="flex items-center">
                <div className="ml-4 space-y-1">
                  <p className="text-sm font-medium leading-none">
                    Conservation Area Request
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Submitted 5 hours ago
                  </p>
                </div>
                <div className="ml-auto font-medium">Approved</div>
              </div>
              <div className="flex items-center">
                <div className="ml-4 space-y-1">
                  <p className="text-sm font-medium leading-none">
                    Archaeological Assessment
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Submitted 1 day ago
                  </p>
                </div>
                <div className="ml-auto font-medium">Pending</div>
              </div>
              <div className="flex items-center">
                <div className="ml-4 space-y-1">
                  <p className="text-sm font-medium leading-none">
                    Landscaping Application
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Submitted 2 days ago
                  </p>
                </div>
                <div className="ml-auto font-medium">Approved</div>
              </div>
              <div className="flex items-center">
                <div className="ml-4 space-y-1">
                  <p className="text-sm font-medium leading-none">
                    Ecology Report
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Submitted 3 days ago
                  </p>
                </div>
                <div className="ml-auto font-medium">Rejected</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <Card className="col-span-4">
          <CardHeader>
            <CardTitle>Monthly Trends</CardTitle>
            <CardDescription>January - June 2024</CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer config={chartConfig}>
              <LineChart
                accessibilityLayer
                data={chartData}
                margin={{
                  left: 12,
                  right: 12,
                }}
              >
                <CartesianGrid vertical={false} />
                <XAxis
                  dataKey="month"
                  tickLine={false}
                  axisLine={false}
                  tickMargin={8}
                  tickFormatter={(value) => value.slice(0, 3)}
                />
                <ChartTooltip
                  cursor={false}
                  content={(props) => <ChartTooltipContent {...props} />}
                />
                <Line
                  dataKey="applications"
                  type="monotone"
                  stroke="var(--color-applications)"
                  strokeWidth={2}
                  dot={false}
                />
              </LineChart>
            </ChartContainer>
          </CardContent>
          <CardFooter>
            <div className="flex w-full items-start gap-2 text-sm">
              <div className="grid gap-2">
                <div className="flex items-center gap-2 font-medium leading-none">
                  Trending up by 5.2% this month{" "}
                  <TrendingUp className="h-4 w-4" />
                </div>
                <div className="flex items-center gap-2 leading-none text-muted-foreground">
                  Showing total applications for the last 6 months
                </div>
              </div>
            </div>
          </CardFooter>
        </Card>
        <Card className="col-span-3">
          <CardHeader>
            <CardTitle>Application Status</CardTitle>
            <CardDescription>Last 6 months breakdown</CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer config={chartConfig}>
              <BarChart accessibilityLayer data={chartData}>
                <CartesianGrid vertical={false} />
                <XAxis
                  dataKey="month"
                  tickLine={false}
                  tickMargin={10}
                  axisLine={false}
                  tickFormatter={(value) => value.slice(0, 3)}
                />
                <ChartTooltip
                  cursor={false}
                  content={(props) => <ChartTooltipContent {...props} indicator="dashed" />}
                />
                <Bar
                  dataKey="approved"
                  fill="var(--color-approved)"
                  radius={4}
                />
                <Bar
                  dataKey="rejected"
                  fill="var(--color-rejected)"
                  radius={4}
                />
              </BarChart>
            </ChartContainer>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
