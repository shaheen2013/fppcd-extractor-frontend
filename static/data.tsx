interface ConditionType {
  name: string;
  value: string;
}

export function getConditionType(): ConditionType[] {
  return [
    {
      name: "Heritage & Listed Buildings",
      value: "Heritage",
    },
    {
      name: "Archaeology",
      value: "Archaeology",
    },
    {
      name: "Conservation Areas",
      value: "Conservation",
    },
    {
      name: "Landscaping",
      value: "Landscaping",
    },
    {
      name: "Ecology",
      value: "Ecology",
    },
  ];
}
