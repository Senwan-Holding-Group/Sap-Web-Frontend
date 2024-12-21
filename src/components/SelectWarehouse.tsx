import { DocumentLine } from "@/lib/types";
import { Select, SelectContent, SelectItem, SelectTrigger } from "./ui/select";
type SelectWarehouseProps = {
  setdocLine:React.Dispatch<React.SetStateAction<DocumentLine[]>>;
  docLine:DocumentLine[];
  item:DocumentLine;
  disable?:boolean;
}
const SelectWarehouse = ({item,setdocLine,docLine,disable}:SelectWarehouseProps) => {
  let warehouseList: string[] = item.warehouseList; 
 if(typeof(item.warehouseList)==="string"){
     warehouseList= JSON.parse(item.warehouseList);     
 }
  
  return (
    <Select disabled={disable}  onValueChange={(SelectValue)=>{
      console.log(SelectValue);
      
      setdocLine(
        docLine.map((value) => {
          if (value.line != item.line||value.lineNum!=item.lineNum) {
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
        <span>{item.warehouseCode?item.warehouseCode:warehouseList[0]}</span>
      </SelectTrigger>
      <SelectContent  className="">
        {warehouseList.map((WC)=>(
        <SelectItem  key={WC} value={WC}>{WC}</SelectItem>

        ))}
      </SelectContent>
    </Select>  )
}

export default SelectWarehouse