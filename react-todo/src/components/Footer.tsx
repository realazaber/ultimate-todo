export default function Footer() {
  const currentDate: number = new Date().getFullYear();

  return (
    <footer className="bg-white flex flex-col justify-center items-center py-3">
      <h3 className="text-primary">Ng Todo</h3>
      <a href="https://azaber.com/" target="_blank" className="text-slate-600">
        Created by Azaber {currentDate}
      </a>
    </footer>
  );
}
