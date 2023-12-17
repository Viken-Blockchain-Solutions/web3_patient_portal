import { TableComponent } from "./_components/table";
export default async function ContributorsPage() {


  return (
    <div className="container mx-auto py-10">
      <h1 className="text-3xl font-semibold text-gray-700 mb-8">Registered Contributors</h1>
      <TableComponent />
    </div>
  );
}
