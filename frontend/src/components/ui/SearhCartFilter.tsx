import React from 'react'
import { category } from '../../constants/data'


type SearhCartFilterProps = {
  selectedCategories: string[]
  onChange: (event: React.ChangeEvent<HTMLInputElement>)=> void
}

const SearhCartFilter = ({selectedCategories, onChange}: SearhCartFilterProps) => {
  return (
    <div className="space-y-5">
      {/* Category Filter */}
      <div className="border-b border-slate-300 pb-5">
        <h4 className="text-md font-semibold mb-2">Category Type</h4>
        {category.options.map((cat, index) => (
          <label key={index} className="flex items-center space-x-2">
            <input
              type="checkbox"
              className="rounded"
              value={cat.label}
              checked={selectedCategories.includes(cat.label)}
              onChange={onChange}
            />
            <span>{cat.label}</span>
          </label>
        ))}
      </div>
    </div>
  )
}

export default SearhCartFilter