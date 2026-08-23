import AnnouncementBar from "@/components/AnnouncementBar";
import Header from "@/components/Header";

export default function MujeresLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <AnnouncementBar />
      <Header />
      {children}
    </>
  );
}
