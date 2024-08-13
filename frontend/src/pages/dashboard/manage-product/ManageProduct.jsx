import React, { useEffect, useState } from "react";
import {
  useDeleteProductMutation,
  useGetProductsQuery,
} from "../../../context/api/productApi";
import { useNavigate } from "react-router-dom";
import { useGetProfileQuery } from "../../../context/api/userApi";
import { Card, Col, Row } from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";

const ManageProduct = () => {
  const [modalOpen, setModalOpen] = useState(null);
  const { data } = useGetProductsQuery();
  const { data: profile } = useGetProfileQuery();
  const [deleteProduct] = useDeleteProductMutation();

  const navigate = useNavigate();

  useEffect(() => {
    if (
      profile?.payload?.role === "admin" ||
      profile?.payload?.role === "user"
    ) {
      navigate("/dashboard/manage-blog");
    }
  }, [profile?.payload?.role]);

  const handleDelete = (id) => {
    if (window.confirm("Are you sure")) {
      deleteProduct(id);
    }
  };

  return (
    <>
      <div className="">
        <Row gutter={[16, 16]} className="flex flex-wrap">
          {data?.payload?.map((product) => (
            <Col
              key={product?._id}
              xs={24}
              sm={12}
              md={8}
              lg={6}
              className="flex justify-center"
            >
              <Card
                bordered={false}
                className="w-full p-0 shadow-md hover:shadow-lg transition-shadow duration-300"
              >
                <div>
                  <div className="h-60 w-full">
                    <img
                      className="h-full w-full"
                      src={product.urls[0]}
                      alt={product.title}
                    />
                  </div>
                  <h3 className="my-1.5 text-lg font-medium">
                    {product.title}
                  </h3>
                  <p className="text-base">{product.desc}</p>
                  <p className="text-base my-1.5">{product.price}</p>
                </div>
                <div className="flex justify-end gap-4">
                  <button
                    onClick={() => setModalOpen(product)}
                    className="text-green-400 font-bold text-xl"
                  >
                    <EditOutlined />
                  </button>
                  <button
                    className="text-red-300 font-bold text-xl"
                    onClick={() => handleDelete(product?._id)}
                  >
                    <DeleteOutlined />
                  </button>
                </div>
              </Card>
            </Col>
          ))}
        </Row>
      </div>
    </>
  );
};

export default ManageProduct;
