import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setProducts, setTotalPages } from "../../redux/reducers/products";
import { Link } from "react-router-dom";

function Categorie() {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.products.products);
  const totalPages = useSelector((state) => state.products.totalPages);
  const [loading, setLoading] = useState(true);
  const { categorie } = useParams();
  const [pageNumber, setPageNumber] = useState(1);
  const totalPagesArray = [];
  for (let i = 1; i <= totalPages; i++) {
    totalPagesArray.push(i);
  }
  console.log(totalPagesArray);

  useEffect(() => {
    setPageNumber(1);
  }, [categorie, totalPages]);

  useEffect(() => {
    const getCategorie = async () => {
      const url = `${process.env.REACT_APP_API_URL}products/categorie/${categorie}/?page=${pageNumber}&limit=5`;
      try {
        setLoading(true);
        const res = await fetch(url);

        if (res.ok) {
          const data = await res.json();
          console.log(data);
          dispatch(setProducts(data.results));
          dispatch(setTotalPages(data.totalPages));
          console.log(products);
          setLoading(false);
        } else {
          console.error("Fetch error!");
          return "No products found!!";
        }
      } catch (e) {
        console.log(e.message);
      }
    };
    getCategorie();
  }, [categorie, pageNumber]);

  return (
    <div className="products">
      {loading ? (
        <p>Site is loading...</p>
      ) : (
        <div>
          <div>
            {products.map((product) => (
              <div className="singlePreviewProduct">
                <Link
                  to={`/${product._id}`}
                  style={{ backgroundColor: "#f7f7f7" }}
                >
                  <div>
                    <h2>{product.title}</h2>
                    <img
                      className="previewImage"
                      src={product.imgUrl}
                      alt={product.title}
                    />
                    <p>{product.price} €</p>
                  </div>
                </Link>
              </div>
            ))}
          </div>
          <div>
            <div className="pagination">
              {totalPagesArray.map((page) => (
                <p
                  className={
                    pageNumber === page ? "activePage" : "inactivePage"
                  }
                >
                  <button
                    className="paginationButton"
                    onClick={() => setPageNumber(page)}
                  >
                    {page}
                  </button>
                </p>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Categorie;
