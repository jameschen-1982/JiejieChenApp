'use client'

import React, {useEffect, useState} from "react";
import {getPosts} from "@/app/services/deliveryService";

export default function Page() {
  const [data, setData] = useState<any>();
  useEffect(() => {
    getPosts().then((res) => {
      setData(res.data);
    });
  }, []);
  return (
    <div className="mx-auto max-w-7xl p-6">
      <div className="relative overflow-x-auto">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th scope="col" className="px-6 py-3">
              Date
            </th>
            <th scope="col" className="px-6 py-3">
              Temperature
            </th>
            <th scope="col" className="px-6 py-3">
              Summary
            </th>
          </tr>
          </thead>
          <tbody>
          {data && data.map((item: any) => (
            <tr key={item.date} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
              <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                {item.date}
              </th>
              <td className="px-6 py-4">
                {item.temperatureC}
              </td>
              <td className="px-6 py-4">
                {item.summary}
              </td>
            </tr>
          ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
