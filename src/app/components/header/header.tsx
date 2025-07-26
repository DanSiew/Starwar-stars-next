

import Link from "next/link";
import "./header.scss";

export default function Header() {
  return (
    <header>
      <div className="header-text">Starwars</div>
      <nav>
        <ul>
          <li>
             <Link className="link" href="/">Home</Link>
          </li>
          <li>
            <Link className="link" href="/counter">Counter</Link>
          </li>
          <li>
            <Link className="link" href="/about">About</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}
