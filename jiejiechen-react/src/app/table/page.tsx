'use client'

import React, {useEffect, useState} from "react";
import {queryForms} from "@/services/deliveryService";
import {Enquiry} from "@/models/enquiry";
import {useAuth} from "react-oidc-context";
import {TableModel} from "@/models/table-model";
import Table from "@/components/table";

export default function Page() {
  const auth = useAuth();
  const [tableModel, setTableModel] = useState<TableModel<Enquiry>>();
  const [pageIndex, setPageIndex] = useState<number>(0);

  const handlePageChange = (pageIndex: number) => {
    setPageIndex(pageIndex);
  }

  useEffect(() => {
    queryForms(pageIndex).then((res) => {
      setTableModel(res.data);
    });
  }, [pageIndex]);

  if (!auth.isLoading && !auth.isAuthenticated) {
    return <div className="h-screen flex items-center justify-center text-center">
      <div className="m-3">
        Please login to view the enquiries
      </div>
      <button
        onClick={async () => {
          await auth.signinRedirect();
        }}
        className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
      >
        Login
      </button>
    </div>;
  }

  return (
    <div className="mx-auto max-w-7xl p-6">
      <div className="relative overflow-x-auto">
        {tableModel && <Table tableModel={tableModel} onPageChange={handlePageChange} />}
      </div>
    </div>
  );
}
