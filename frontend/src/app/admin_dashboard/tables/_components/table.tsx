"use client";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from "../../../../../components/ui/table";
import { Contributor } from "../../../../../types";
import { supabase } from "../../../../../db/supabaseClient";
import { convertToCET } from "../../../../../src/utils/tools";
import { useEffect, useState } from "react";


export const TableComponent = () => {
  const [contributors, setContributors] = useState<Contributor[]>([]);
  const [isLoading, setLoading] = useState(true);

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

  const deleteContributor = async (contributorDid: string) => {
    const { error } = await supabase
      .from("contributors")
      .delete()
      .eq("contributor_did", contributorDid);

    if (error) {
      console.error("Error deleting contributor:", error);
    } else {
      setContributors((prevContributors) =>
        prevContributors.filter(
          (contributor) => contributor.contributor_did !== contributorDid
        )
      );
    }
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <Table>
        <TableCaption>A list of the contributors.</TableCaption>
        <TableHeader className="bg-gray-50">
          <TableRow>
            <TableHead className="w-[100px]">DID</TableHead>
            <TableHead>Registration Date</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {contributors.map((contributor, index) => (
            <TableRow key={index}>
              <TableCell className="font-medium">
                did:key:{contributor.contributor_did}
              </TableCell>
              <TableCell>
                {convertToCET(contributor.registration_date)}
              </TableCell>
              <TableCell className="text-right">
                <button
                  onClick={() => deleteContributor(contributor.contributor_did)}
                  className="text-red-500 hover:text-red-700"
                >
                  Delete
                </button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};
