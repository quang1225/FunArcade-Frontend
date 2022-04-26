interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

const CommonTabPanel = (props: TabPanelProps) => {
  const { children, value, index, ...other } = props;

  return (
    <div style={{ height: '100%' }} hidden={value !== index} {...other}>
      {value === index && <div className="content-wrap">{children}</div>}
    </div>
  );
};

export default CommonTabPanel;
