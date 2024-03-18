import { Badge } from "@mui/material";
import { MdMessage } from "react-icons/md";
import { useSelector } from "react-redux";
import { RootState } from "store/store";

function ChatBadgeIcon() {
  const { notifcationBadges } = useSelector((state: RootState) => state);
  return (
      <Badge badgeContent={notifcationBadges.chatBadgeCount} color="primary">
        <MdMessage className="h-6 w-6" />
      </Badge>
  );
}

export default ChatBadgeIcon;
