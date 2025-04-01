"use client";
// tạo file này để sử dụng use client - người dùng, để lấy keyword từ url

/* eslint-disable @typescript-eslint/no-explicit-any */
import { SongItem2 } from "@/app/components/song/SongItem2";
import { dbFirebase } from "@/app/firebaseConfig";
import { get, ref } from "firebase/database";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export const Section1 = () => {
  //thằng SearchParams này làm load lại component nên phải dùng useEffect và useState
  const searchParams = useSearchParams();
  const [dataFinal, setDataFinal] = useState<any>(null);

  //lấy giá trị của keyword từ url
  const defaultKeyword = searchParams.get("keyword") || "";
  
  useEffect(() => {
    const dataSection1: any[] = [];
    
    const fetchData = async () => { 
      //lấy dữ liệu từ firebase, dùng get
      const items = await get(ref(dbFirebase, 'songs'));
      items.forEach((item: any) => {
        const key = item.key;
        const data = item.val();

        if(data.title.includes(defaultKeyword)) {
          dataSection1.push(
            {
              id: key,
              image: data.image,
              title: data.title,
              singer: "",
              link: `/song/${key}`,
              time: "4:32",
              singerId: data.singerId,
              audio: data.audio
            }
          );
        }
      })

      for (const item of dataSection1) {
        const itemSinger = await get(ref(dbFirebase, '/singers/' + item.singerId[0]));
        const dataSinger = itemSinger.val();
        item.singer = dataSinger.title;
      }

      setDataFinal(dataSection1);
    }

    fetchData();
  }, [defaultKeyword]);

  return (
    <>
      {dataFinal && (
        <>
          {dataFinal.map((item: any, index: number) => (
            <SongItem2 key={index} item={item} />
          ))}
        </>
      )}
    </>
  )
}