const useTraverseTree = () => {
  const insertNode = (tree, folderId, item, isFolder) => {
    if(tree.id === folderId && tree.isFolder){
        tree.items.unshift({
            id: new Date().getTime(),
            name: item,
            isFolder,
            items: [],
        })
        return tree;
    }

    const updatedItems = tree.items.map((treeItem) =>
      insertNode(treeItem, folderId, item, isFolder)
    );
    return { ...tree, items: updatedItems };
  }

  const deleteNode = (tree, nodeId) => {
    const updatedItems = tree.items.filter((item) => item.id !== nodeId).map((item) => ({
      ...item,
      items: deleteNode(item, nodeId).items,
    }));
    return { ...tree, items: updatedItems };
  };
  
  const renameNode = (tree, nodeId, newName) => {
    const updatedItems = tree.items.map((item) => {
      if (item.id === nodeId) {
        return { ...item, name: newName };
      }
      return { ...item, items: renameNode(item, nodeId, newName).items };
    });
    return { ...tree, items: updatedItems };
  };

  return { insertNode, deleteNode, renameNode };
}

export default useTraverseTree;