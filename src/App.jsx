import { useState } from "react";
import "./App.css";
import explorer from "./data/folderData";
import { Folder } from "./components/NestedFolder_Structure/Folder";
import useTraverseTree from "./hooks/useTraverseTree";
import Pagination from "./components/Pagination/Pagination";

function App() {
  /**
   * Start of Folder Structure Code
   */
  const [explorerData, setExplorerData] = useState(explorer);
  const { insertNode, deleteNode, renameNode } = useTraverseTree();

  const handleInsertNode = (folderId, item, isFolder) => {
    const finalTree = insertNode(explorerData, folderId, item, isFolder);
    setExplorerData(finalTree);
  };

  const handleDeleteNode = (folderId) => {
    const finalTree = deleteNode(explorerData, folderId);
    setExplorerData(finalTree);
  };

  const handleRenameNode = (folderId, item) => {
    const finalTree = renameNode(explorerData, folderId, item);
    setExplorerData(finalTree);
  };
  /**
   * End of Folder Structure code
   */

  return (
    <div className="App">
      <h1>Folder Structure Example</h1>
      <Folder
        handleInsertNode={handleInsertNode}
        handleDeleteNode={handleDeleteNode}
        handleRenameNode={handleRenameNode}
        explorer={explorerData}
      />
      <br />
      <h1>Pagination</h1>
      <Pagination />
    </div>
  );
}

export default App;
