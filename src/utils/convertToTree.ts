export const convertToTree = (
  treeList: any[] = [],
  parent_id: number | null,
) => {
  const tree = [];

  treeList.forEach((item) => {
    if (item.parent_id === parent_id) {
      const children = convertToTree(treeList, item.id);
      if (children.length >= 0) {
        item.children = children;
      }
      tree.push(item);
    }
  });

  return tree;
};
