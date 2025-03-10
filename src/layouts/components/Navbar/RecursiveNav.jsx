
const RecursiveNav = async({data}) => {
    console.log(data);
    // return (
    //     <List
    //       bordered
    //       dataSource={data}
    //       renderItem={item => (
    //         <List.Item>
    //           {console.log(item)}
    //             <Link to={item.slug} className="text-[#9f224e] text-[16px] font-bold pb-2">
    //                 {item.title}
    //             </Link>
    //           {item.children && item.children.length > 0 && (
    //             <div style={{ marginLeft: '20px' }}>
    //               <RecursiveNav data={item.children} />
    //             </div>
    //           )}
    //         </List.Item>
    //       )}
    //     />
    //   );
}


export default RecursiveNav