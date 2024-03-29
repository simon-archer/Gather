  import { h } from "preact";
  import { useEffect, useState } from "preact/hooks";
  import { tw } from "twind";
  import { format } from 'datetime';


  function formatDate(dateString: string) {
    const date = new Date(dateString);
  
    const diffInDays = Math.floor((new Date().getTime() - date.getTime()) / (1000 * 60 * 60 * 24));
    
    if (diffInDays <= 7) {
      // Assuming 'datetime' doesn't have a 'formatDistanceToNow' function, 
      // we'll handle it manually (though this is a basic version):
      if (diffInDays === 0) return "Today";
      if (diffInDays === 1) return "Yesterday";
      return `${diffInDays} days ago`;
    } else {
      // Using the 'format' function from 'datetime' as you initially did:
      return format(date, 'dd/MM');
    }
  } 

  const History = ({ isCollapsed, setIsCollapsed, setSelectedItem, shouldRefreshHistory, setShouldRefreshHistory }) => {
    const [historyData, setHistoryData] = useState([]);
  
    const fetchHistory = async () => {
      try {
        const response = await fetch("/api/fetchHistory");
        if (!response.ok) {
          throw new Error(`Server responded with ${response.status}: ${response.statusText}`);
        }
  
        const contentType = response.headers.get("content-type");
        if (!contentType || !contentType.includes("application/json")) {
          throw new Error("Received non-JSON response from the server.");
        }
  
        const result = await response.json();
  
        if (result.error) {
          console.error('Error fetching history:', result.error);
        } else {
          setHistoryData(result.data);
        }
      } catch (error) {
        console.error('Error fetching history:', error);
      }
    };
  
    useEffect(() => {
      if (shouldRefreshHistory) {
        fetchHistory();
        setShouldRefreshHistory(false);
      }
    }, [shouldRefreshHistory]);
  
    useEffect(() => {
      fetchHistory();
    }, []);
      
      function formatDateToYYYYMMDD(dateString: string) {
        const date = new Date(dateString);
        return date.toISOString().split('T')[0];
      }

      const sortedHistoryData = [...historyData].sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
      const groupedHistoryData = sortedHistoryData.reduce((groups, item) => {
        const date = formatDateToYYYYMMDD(item.created_at);
        if (!groups[date]) {
          groups[date] = [];
        }
        groups[date].push(item);
        return groups;
      }, {});
    
      return (
        h("div", { class: tw`relative w-full p-3` }, [
          h("div", {
            class: tw`${isCollapsed ? 'translate-x-[-100%]' : ''} flex flex-col w-full items-start bg-white shadow-lg p-4 rounded-xl overflow-hidden history-scrollbar`
          }, [
            h("h2", { class: tw`text-xl font-bold w-full text-center` }, "History"),
            Object.entries(groupedHistoryData).map(([date, items]) => (
              h("div", { class: tw`w-full` }, [
                h("h3", {}, formatDate(date)),
                items.map(item => {
                  const fullGptResponse = item.full_gpt_response ? JSON.parse(item.full_gpt_response) : {};
                  const content = fullGptResponse.choices ? fullGptResponse.choices[0].message.function_call.arguments : {};
                  if (content.keywords && typeof content.keywords === 'string') {
                    try {
                      content.keywords = JSON.parse(content.keywords);
                    } catch (error) {
                      console.error('Error parsing keywords:', error);
                    }
                  }
                  return h("div", {
                    class: tw`w-full mb-4 mt-4 border border-gray-300 p-2 rounded`,
                    onClick: () => {
                      setSelectedItem(JSON.parse(item.full_gpt_response)),
                      setIsCollapsed(true)
                    }
                  }, [
                    h("p", { class: tw`text-sm text-gray-500` }),
                    h("p", { class: tw`font-bold truncate` }, item.title),
                    h("p", { class: tw`truncate` }, content.explanation ? content.explanation : "")
                  ])
                })
              ])
            ))
          ])
        ])
      );
    }
    
    export default History;
