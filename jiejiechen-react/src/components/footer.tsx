export default function FooterComponent() {
  const thisYear = new Date().getFullYear();
  return (
    <footer className="bg-white rounded-lg shadow mt-4 mb-0 dark:bg-gray-800">
      <div className="w-full mx-auto max-w-screen-xl p-4 md:flex md:items-center md:justify-between">
      <span className="text-sm text-gray-500 sm:text-center dark:text-gray-400">© {thisYear} <a href="https://www.jiejiechen.com" className="hover:underline">Jiejie Chen/Syd Web Design</a>. All Rights Reserved.
    </span>
        <ul className="flex flex-wrap items-center mt-3 text-sm font-medium text-gray-500 dark:text-gray-400 sm:mt-0">
          <li>
            <a href="https://www.linkedin.com/in/jameschen-1982-au/" className="hover:underline me-4 md:me-6">LinkedIn</a>
          </li>
          <li>
            <a href="https://github.com/jameschen-1982" className="hover:underline me-4 md:me-6">Github</a>
          </li>
        </ul>
      </div>
    </footer>
  );
}
