// import { useMutation, useQueryClient } from "@tanstack/react-query";
// import { CreatePORequest } from "../formsValidation";
// import { createPo } from "@/api/client";

// export const useCreatePO = (onSuccess?: () => void) => {
//     const queryClient = useQueryClient();
//     return useMutation({
//       mutationFn: (PO: CreatePORequest) => createPo(PO),
//       onSuccess: () => {
//         queryClient.invalidateQueries({
//           queryKey: ["activePO"],
//         });
        
//         onSuccess?.();
//       },
//     });
//   };