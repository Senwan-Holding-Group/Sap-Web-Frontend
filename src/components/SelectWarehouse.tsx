import { DocumentLine } from "@/lib/types";
import { Select, SelectContent, SelectItem, SelectTrigger } from "./ui/select";
type SelectWarehouseProps = {
  setdocLine:React.Dispatch<React.SetStateAction<DocumentLine[]>>;
  docLine:DocumentLine[];
  item:DocumentLine;
}
const SelectWarehouse = ({item,setdocLine,docLine}:SelectWarehouseProps) => {
  let warehouseList: string[] = item.warehouseList; 
 if(typeof(item.warehouseList)==="string"){
     warehouseList= JSON.parse(item.warehouseList);     
 }
  
  return (
    <Select  onValueChange={(SelectValue)=>{
      console.log(SelectValue);
      
      setdocLine(
        docLine.map((value) => {
          if (value.line != item.line) {
            return value;
          } else {
            return {
              ...value,
              warehouseCode:SelectValue
            };
          }
        })
      );
    }}>
      <SelectTrigger className="w-[9rem] h-6">
        {/* <SelectValue  placeholder="Select" /> */}
        <span>{item.warehouseCode?warehouseList[0]:"Select"}</span>
      </SelectTrigger>
      <SelectContent  className="">
        {warehouseList.map((WC)=>(
        <SelectItem  key={WC} value={WC}>{WC}</SelectItem>

        ))}
      </SelectContent>
    </Select>  )
}

export default SelectWarehouse