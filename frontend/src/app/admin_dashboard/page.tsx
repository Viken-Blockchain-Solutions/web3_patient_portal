"use client";
import Image from "next/image";

import { Button } from "../../../components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from "../../../components/ui/card";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger
} from "../../../components/ui/tabs";

import { CalendarDateRangePicker } from "../../../components/date-range-picker";
import { Overview } from "../../../components/overview";
import { RecentContributions } from "../../../components/recent-contributions";
import { UserNav } from "../../../components/user-nav";
import { Search } from "../../../components/search";
import { MainNav } from "../../../components/main-nav";
import TeamSwitcher from "../../../components/team-switcher";
import { useEffect, useState } from "react";
import { Contributor } from "@/types";
import { supabase } from "@/db/supabaseClient";
import { Contribution } from "../../../types";


export default function DashboardPage() {
  const [loading, setLoading] = useState(true);
  const [contributors, setContributors] = useState<Contributor[]>([]);
  const [contributions, setContributions] = useState<any[]>([]);
  const [pools, setPools] = useState<any[]>([]);


  useEffect(() => {
    const fetchContributors = async () => {
      setLoading(true);
      console.log("Fetching contributors from the database...");

      const { data, error } = await supabase.from("contributors").select("*");
      console.log(data);
      if (error) {
        console.error("Error fetching data:", error);
      } else {
        setContributors(data || []);
      }

      setLoading(false);
    };

    fetchContributors();
  }, []);

  useEffect(() => {
    const fetchContributions = async () => {
      const { data, error } = await supabase.from("new_contributions").select("*");
      if (error) {
        console.error("Error fetching data:", error);
        return;
      }
      setContributions(
        (data || []).sort((a, b) => new Date(b.submitted_at).getTime() - new Date(a.submitted_at).getTime())
      );
    };

    fetchContributions();
  }, []);

  useEffect(() => {
    const fetchPools = async () => {
      setLoading(true);
      console.log("Fetching pools from the database...");

      const { data, error } = await supabase.from("research_pools").select("*");
      console.log(data);
      if (error) {
        console.error("Error fetching data:", error);
      } else {
        setPools(data || []);
      }

      setLoading(false);
    };

    fetchPools();
  }, []);

  return (
    <>
      <div className="md:hidden">
        <Image
          src="/examples/dashboard-light.png"
          width={1280}
          height={866}
          alt="Dashboard"
          className="block dark:hidden"
        />
        <Image
          src="/examples/dashboard-dark.png"
          width={1280}
          height={866}
          alt="Dashboard"
          className="hidden dark:block"
        />
      </div>
      <div className="hidden flex-col md:flex">
        <div className="border-b">
          <div className="flex h-16 items-center px-4">
            <TeamSwitcher />
            <MainNav className="mx-6" />
            <div className="ml-auto flex items-center space-x-4">
              <Search />
              <UserNav />
            </div>
          </div>
        </div>
        <div className="flex-1 space-y-4 p-8 pt-6">
          <div className="flex items-center justify-between space-y-2">
            <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
            <div className="flex items-center space-x-2">
              <CalendarDateRangePicker />
              <Button>Download</Button>
            </div>
          </div>
          <Tabs defaultValue="overview" className="space-y-4">
            <TabsList>
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="analytics" disabled>
                Analytics
              </TabsTrigger>
              <TabsTrigger value="reports" disabled>
                Reports
              </TabsTrigger>
              <TabsTrigger value="notifications" disabled>
                Notifications
              </TabsTrigger>
            </TabsList>
            <TabsContent value="overview" className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">
                      Total Contributors
                    </CardTitle>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      className="h-4 w-4 text-muted-foreground"
                    >
                      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                      <circle cx="9" cy="7" r="4" />
                      <path d="M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
                    </svg>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{contributors.length}</div>
                    <p className="text-xs text-muted-foreground">
                    1 unknown
                    </p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">
                      Total Earnings Rewarded
                    </CardTitle>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      className="h-4 w-4 text-muted-foreground"
                    >
                      <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
                    </svg>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">${contributions.length * 25}</div>
                    <p className="text-xs text-muted-foreground">
                      $25 average per contribution
                    </p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Pools</CardTitle>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      className="h-4 w-4 text-muted-foreground"
                    >
                      <rect width="20" height="14" x="2" y="5" rx="2" />
                      <path d="M2 10h20" />
                    </svg>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{pools.length}</div>
                    <p className="text-xs text-muted-foreground">
                      Total Pools
                    </p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">
                      Total Contibutions
                    </CardTitle>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      className="h-4 w-4 text-muted-foreground"
                    >
                      <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
                    </svg>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{contributions.length}</div>
                    <p className="text-xs text-muted-foreground">
                    Total Proof-Requests Verified
                    </p>
                  </CardContent>
                </Card>
              </div>
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
                <Card className="col-span-4">
                  <CardHeader>
                    <CardTitle>Overview</CardTitle>
                  </CardHeader>
                  <CardContent className="pl-2">
                    <Overview
                      contributions={contributions}/>
                  </CardContent>
                </Card>
                <Card className="col-span-3">
                  <CardHeader>
                    <CardTitle>Recent Contributions</CardTitle>
                    <CardDescription>
                      Last 5 contributions.
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <RecentContributions
                      contributions={contributions}
                    />
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </>
  );
}
