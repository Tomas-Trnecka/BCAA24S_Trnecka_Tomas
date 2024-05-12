import { useContext } from "react";
import { FinderContext } from "./FinderContext.js";

function FinderList() {
  const { finderList } = useContext(FinderContext);

  return (
    finderList.map((hardware) => {
      return (
        <table>
          <tr>
            <td>{hardware.name}</td>
            <td>{hardware.type}</td>
            <td>{hardware.price}</td>
            <td>{hardware.ranking}</td>
          </tr>
        </table>
      );
    })
  );
}

export default FinderList;
