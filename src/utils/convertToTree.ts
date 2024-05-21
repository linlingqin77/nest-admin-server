export const convertToTree = (
  treeList: any[] = [],
  parentId: number | null,
) => {
  const tree = [];

  treeList.forEach((item) => {
    if (item.parentId === parentId) {
      const children = convertToTree(treeList, item.id);
      if (children.length >= 0) {
        item.children = children;
      }
      tree.push(item);
    }
  });

  return tree;
};
