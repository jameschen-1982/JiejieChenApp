import Pagination from "@/components/pagination";
import React from "react";
import {TableModel} from "@/models/table-model";
import moment from "moment/moment";

const formatDate = (value: Date) => {
  return moment(value).format('DD/MM/YYYY HH:mm:ss')
}

export default function TableComponent({tableModel, onPageChange}: {
  tableModel: TableModel<any>,
  onPageChange: (pageNumber: number) => void
}) {

  return (<>
    <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
      <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
      <tr>
        <th scope="col" className="px-6 py-3">
          Email
        </th>
        <th scope="col" className="px-6 py-3">
          First Name
        </th>
        <th scope="col" className="px-6 py-3">
          Last Name
        </th>
        <th scope="col" className="px-6 py-3">
          Phone
        </th>
        <th scope="col" className="px-6 py-3">
          Company
        </th>
        <th scope="col" className="px-6 py-3">
          Submission Time
        </th>
      </tr>
      </thead>
      <tbody>
      {tableModel.data.map((enquiry: any) => (
        <tr key={enquiry.timeSubmitted} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
          <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
            {enquiry.email}
          </th>
          <td className="px-6 py-4">
            {enquiry.firstName}
          </td>
          <td className="px-6 py-4">
            {enquiry.lastName}
          </td>
          <td className="px-6 py-4">
            {enquiry.phone}
          </td>
          <td className="px-6 py-4">
            {enquiry.company}
          </td>
          <td className="px-6 py-4">
            {formatDate(new Date(enquiry.timeSubmitted + "Z"))}
          </td>
        </tr>
      ))}
      </tbody>
    </table>
    <Pagination pageIndex={tableModel.pageIndex} totalPageCount={tableModel.totalPageCount} onPageChange={onPageChange} />
  </>);
}
