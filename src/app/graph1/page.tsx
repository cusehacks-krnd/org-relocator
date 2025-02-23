import Navbar from "@/components/navbar/navbar";
import Graph1Component from "../../components/graph1/graph1";
import Link from "next/link";

export default function Graph1() {
  return (
    <div className="min-h-screen bg-[#eae6df]">
      <Navbar />
      <div>
        {/* Use the Graph1Component */}
        <Graph1Component/>
        {/* Add the Back button */}
        <Link href="/">
          <button style={{ marginTop: "20px", padding: "10px 20px", backgroundColor: "#0070f3", color: "white", border: "none", borderRadius: "5px", cursor: "pointer" }}>
            Go Back to Home Page
          </button>
        </Link>
      </div>
    </div>
  );
}