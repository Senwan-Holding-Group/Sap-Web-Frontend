enum Status {
  APPROVED = "approved",
  APPENDED = "opened",
  PENDING = "pending",
  CLOSED = "closed",
  CANCELLED = "cancelled",
  REJECTED = "rejected",
  UNMATCHED = "unmatched",
}

interface StatusBadgeProps {
  status: string;
}

const StatusBadge: React.FC<StatusBadgeProps> = ({ status }) => {
  const getStatusClasses = (status: string): string => {
    const normalizedStatus = status.toLowerCase();

    switch (normalizedStatus) {
      case Status.APPROVED:
      case Status.APPENDED:
        return "bg-geantSap-primary-15 text-geantSap-primary-600 hover:bg-geantSap-primary-100";
      case Status.PENDING:
      case Status.CLOSED:
        return "bg-geantSap-gray-50 text-geantSap-gray-600 hover:bg-geantSap-gray-100";
      case Status.CANCELLED:
      case Status.REJECTED:
      case Status.UNMATCHED:
        return "bg-geantSap-error-50 text-geantSap-error-500 hover:bg-geantSap-error-100";
      default:
        return "bg-geantSap-gray-50 text-geantSap-gray-600 hover:bg-geantSap-gray-100";
    }
  };

  return (
    <span
      className={`
          ${getStatusClasses(status)}
          px-3 
        py-1 
        rounded-[40px] 
        text-sm 
        font-normal
        leading-[21px] 
        inline-block
        capitalize
        transition-colors
        duration-200
        cursor-default
        `}
    >
      {status}
    </span>
  );
};

export default StatusBadge;
