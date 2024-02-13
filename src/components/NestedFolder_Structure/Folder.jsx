import React, { useState } from "react";
import "./folder.css";

export const Folder = ({
  handleInsertNode,
  handleDeleteNode,
  handleRenameNode,
  explorer,
}) => {
  const [expand, setExpand] = useState(false);
  const [showInput, setShowInput] = useState({
    visible: false,
    isFolder: null,
  });
  const [isVisible, setIsVisible] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleContextMenu = (e) => {
    e.preventDefault();
    setPosition({ x: e.clientX, y: e.clientY });
    setIsVisible(true);
  };

  const handleClickOption = (e, isFolder, option) => {
    console.log(`Clicked ${option}`);
    e.stopPropagation();
    setExpand(true);
    setShowInput({
      visible: true,
      isFolder,
    });
    setIsVisible(false);

    switch (option) {
      case "Delete":
        handleDeleteNode(explorer.id);
        break;
      case "Rename":
        const newName = prompt("Enter new name");
        if (newName !== null) {
          handleRenameNode(explorer.id, newName);
        }
        break;
      default:
        break;
    }
  };

  const handleOutsideClick = () => {
    setIsVisible(false);
  };

  const onAddFolder = (e) => {
    if (e.keyCode === 13 && e.target.value) {
      handleInsertNode(explorer.id, e.target.value, showInput.isFolder);
      setShowInput({ ...showInput, visible: false });
    }
  };

  return (
    <>
      {explorer.isFolder ? (
        <div style={{ margin: "1rem", width: "100%" }}>
          <div
            onContextMenu={handleContextMenu}
            className="folder"
            onClick={() => setExpand(!expand)}
          >
            <span>📁 {explorer.name}</span>
            {isVisible && (
              <div
                className="context-menu"
                style={{ top: position.y, left: position.x }}
                onClick={handleOutsideClick}
              >
                <div
                  className="context-menu-option"
                  onClick={(e) => handleClickOption(e, true, "New Folder")}
                >
                  New Folder
                </div>
                <div
                  className="context-menu-option"
                  onClick={(e) => handleClickOption(e, false, "New File")}
                >
                  New File
                </div>
                <div
                  className="context-menu-option"
                  onClick={(e) => handleClickOption(e, null, "Delete")}
                >
                  Delete
                </div>
                <div
                  className="context-menu-option"
                  onClick={(e) => handleClickOption(e, null, "Rename")}
                >
                  Rename
                </div>
              </div>
            )}
          </div>

          <div
            style={{
              display: expand ? "block" : "none",
              paddingLeft: "1.40rem",
            }}
          >
            {showInput.visible && (
              <div className="inputContainer">
                <span>{showInput.isFolder ? "📁" : "📄"}</span>
                <input
                  className="inputContainer__input"
                  onKeyDown={onAddFolder}
                  autoFocus
                  type="text"
                  onBlur={() => setShowInput({ ...showInput, visible: false })}
                />
              </div>
            )}
            {explorer.items.map((expo) => {
              return (
                <Folder
                  handleInsertNode={handleInsertNode}
                  explorer={expo}
                  key={expo.id}
                />
              );
            })}
          </div>
        </div>
      ) : (
        <span className="file">📄 {explorer.name}</span>
      )}
    </>
  );
};
