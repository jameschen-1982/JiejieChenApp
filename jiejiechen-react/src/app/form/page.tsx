'use client'

// `app/dashboard/page.tsx` is the UI for the `/home` URL
import React, {useEffect, useState} from "react";
import {getPosts} from "@/app/services/deliveryService";

export default function Page() {
  const [data, setData] = useState<any>();
  useEffect(() => {
    getPosts().then((res) => {
      setData(res.data);
    });
  }, []);
  return (<div className="mx-auto max-w-7xl p-6">
      <h1>Hello, Home Page!</h1>
      {data && data.map((item: any) => (
        <div key={item.date}>
          {item.date} - {item.temperatureC}
        </div>
      ))}
    </div>
  );
}
