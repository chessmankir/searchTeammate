import {useState} from "react";
import {useFiltersStore} from "../../store/filtersStore.tsx";

export function FilterAge(){
    const ageFrom = useFiltersStore((s) => s.ageFrom);
    const ageTo = useFiltersStore((s) => s.ageTo);
    const setAgeTo = useFiltersStore((s) => s.setAgeTo);
    const setAgeFrom = useFiltersStore((s) => s.setAgeFrom);
   return(
       <div className="filter-age-wrapper">
           <div className="filter-block__label">Возраст (от до)</div>
           <div className="filter-age">
               <div className="filter-ageto-wrapper">
                   <input type="number" value={ageFrom}
                          onChange={(e) => setAgeFrom(e.target.value)}
                          className="filter-age-input-before" placeholder="От"/>
               </div>
               <div className="filter-agefrom-wrapper">
                   <input type="number" value={ageTo}
                          onChange={(e) => setAgeTo(e.target.value)}
                          className="filter-age-input-after" placeholder="До"/>
               </div>
               <div className="clear"></div>
           </div>
       </div>
   );
}