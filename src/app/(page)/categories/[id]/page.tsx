import { CardInfo } from "@/app/components/card/CardInfo";
import { SongItem2 } from "@/app/components/song/SongItem2";
import { Title } from "@/app/components/title/Title";
import { dbFirebase } from "@/app/firebaseConfig";
import { onValue, ref } from "firebase/database";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Danh sách bài hát theo danh mục",
  description: "Project nghe nhạc trực tuyến",
};

export default async function CategoryDetailPage(props: any) {

  // Lấy id từ params
  // params là một object chứa các tham số trong url
  const { id } = await props.params;

  let dataFinal: any = null;

  // Lấy dữ liệu từ firebase
  onValue(ref(dbFirebase, '/categories/' + id), (item) => {
    dataFinal = item.val();
  })

  // Lấy dữ liệu từ firebase
  const dataSection2: any[] = [];
  const songRef = ref(dbFirebase, 'songs');

  // duyệt qua từng bài hát và lấy ra danh sách bài hát theo danh mục
  onValue(songRef, (items) => {
    items.forEach((item) => {
      const key = item.key;
      const data = item.val();

      // để xem có cùng danh mục không
      if(data.categoryId === id) {
        onValue(ref(dbFirebase, '/singers/' + data.singerId[0]), (itemSinger) => {
          const dataSinger = itemSinger.val();
          dataSection2.push(
            {
              id: key,
              image: data.image,
              title: data.title,
              singer: dataSinger.title,
              link: `/song/${key}`,
              time: "4:32",
              audio: data.audio
            }
          );
        })
      }
    })
  });

  return (
    <>
      {/* CardInfo */}
      {/* Sử dụng data của biến dataFinaldataFinal */}
      <CardInfo
        image={dataFinal.image}
        title={dataFinal.title}
        description={dataFinal.description}
      />

      {/* Section 2 */}
      <div className="mt-[30px]">
        <Title text="Danh Sách Bài Hát" />

        {/* sử dụng data của mảng dataSection2 */}
        <div className="grid grid-cols-1 gap-[10px]">
          {dataSection2.map((item, index) => (
            <SongItem2 key={index} item={item} />
          ))}
        </div>
      </div>
    </>
  );
}