import { AuthResponse } from "types/types"
import {$api} from "../http/axios"
import { AxiosResponse } from "axios"

interface MeetingData {
  status: string;
  team: string;
  till?: string | null;
  userCounts: number | null;
}


export default class ChangeService {
  static async longPoll(dataCallback: (result: MeetingData[] | null) => void): Promise<any> {
    const pollInterval = 5000; 
    const PollOperation = async () => {
      try {
        const result = await getMeetings();
        return result;
      } catch (error) {
        console.error('Long polling error:', error);
        return null;
      }
    };
    const sendResultToClient = (result: any) => {
      
    };

    while (true) {
      const result = await PollOperation();

      if (result !== null) {
        sendResultToClient(result);
      }

      await new Promise(resolve => setTimeout(resolve, pollInterval));
    }
  }
}


async function getMeetings() {
      return   [
        {
          status:"Ongoing",
          team:"FAIA",
          userCounts: 3
        },
        {
          status:"Upcoming",
          team:"AMAP",
          till:"15min",
          userCounts: 0
        },
        {
        status:"Upcoming",
          team:"FAIA",
          till:"10min",
          userCounts: 0
        },
        {
          status:"Upcoming",
          team:"FAIA",
          till:"5min",
          userCounts: 0
        }
      
      ]
}