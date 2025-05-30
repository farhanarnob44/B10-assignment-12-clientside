import React, { useEffect, useState } from "react";
import SectionTitle from "../Components/SectionTitle";
import { FaTrash } from "react-icons/fa";
import UseeAxiosSecure from "../Components/UseeAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import Swal from "sweetalert2";
import axios from "axios";

const AllPropertiesTable = () => {
  const axiosSecure = UseeAxiosSecure();

  const [menu, setMenu] = useState([]);
  const { refetch } = useQuery({
    queryKey: ["menu"],
    queryFn: async () => {
      const res = await axiosSecure.get("/allproperties");
      setMenu (res.data);
    },
  });
  // useEffect(() => {
  //   fetch("https://real-estate-server-lilac.vercel.app/allproperties")
  //     .then((res) => res.json())
  //     .then((data) => {
  //       setMenu(data);
  //     });
  // }, []);

  const handleDeleteProduct = (menuItem) => {
    // console.log(axiosSecure);
    console.log(menuItem._id);
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        // });
        axiosSecure.delete(`/allproperties/${menuItem._id}`).then((res) => {
            // const {dataa} =  axios.delete(`/allproperties/${menuItem._id}`).then((res) => {
          refetch();
          if (res.data.deletedCount > 0) {
            Swal.fire({
              title: "Deleted!",
              text: `${menuItem.name} has been deleted.`,
              icon: "success",
            });
          }
        });
      }
    });
  };

  return (
    <div>
      <SectionTitle
        heading="Manage All Items"
        subHeading="Hurry Up "
      ></SectionTitle>
      <h2 className="text-3xl ml-9 ">Total properties : {menu.length}</h2>
      <div className="overflow-x-auto w-10/12 mx-auto mt-8">
        <table className="table table-zebra">
          {/* head */}
          <thead>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Price</th>
              <th>Location</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {/* row 1 */}
            {menu.map((menuItem, index) => (
              <tr key={menuItem._id}>
                <th>{index + 1}</th>
                <td className="flex font-bold items-center">
                  <img
                    className="w-12 h-12 rounded-lg mr-3"
                    src={menuItem.propertyImage}
                    alt=""
                  />
                  {menuItem.propertyTitle}
                  {menuItem._id}
                </td>
                <td>{menuItem.priceRange}</td>
                <td>{menuItem.propertyLocation}</td>
                {/* <td>
                          {" "}
                          {menu.role === 'admin' ? 'Admin' :
                            <buTton
                              // onClick={() => handleMakeAdmin(menu)}
                              className="btn"
                            >
                              
                            </buTton>
                          }
                        </td> */}
                <td>
                  <buTton
                    onClick={() => handleDeleteProduct(menuItem)}
                    className="btn"
                  >
                    <FaTrash></FaTrash>
                  </buTton>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AllPropertiesTable;

