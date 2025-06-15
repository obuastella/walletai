import { Search } from "lucide-react";

const FilterBar = ({ searchTerm, setSearchTerm }: any) => (
  <div className="bg-gray-900/50 backdrop-blur-xl rounded-2xl p-6 border border-gray-800 mb-8">
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
      <div className="relative lg:col-span-2">
        <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />

        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search transactions, merchants, or references..."
          className="w-full bg-gray-800 text-white pl-10 pr-4 py-2 rounded-xl border border-gray-700 focus:border-purple-500 focus:outline-none"
        />
      </div>
    </div>
  </div>
);
export default FilterBar;
