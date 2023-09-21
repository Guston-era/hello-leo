import React from 'react'

function Toy({ toy }) {
  return (
    <div class="row justify-content-center mb-3">
      <div class="col-md-12">
        <div class="card shadow-0 border rounded-3">
          <div class="card-body">
            <div class="row g-0">
              <div class="col-xl-3 col-md-4 d-flex justify-content-center">
                <div class="bg-image hover-zoom ripple rounded ripple-surface me-md-3 mb-3 mb-md-0">
                  <img src={toy.image} class="w-100" />
                  <a href="#!">
                    <div class="hover-overlay">
                      <div
                        class="mask"
                        style={{
                          backgroundColor: 'rgba(253, 253, 253, 0.15)',
                        }}
                      ></div>
                    </div>
                  </a>
                </div>
              </div>
              <div class="col-xl-6 col-md-5 col-sm-7">
                <h5>{toy.name}</h5>
                <div class="d-flex flex-row">
                  <div class="text-warning mb-1 me-2">
                    <i class="fa fa-star"></i>
                    <i class="fa fa-star"></i>
                    <i class="fa fa-star"></i>
                    <i class="fa fa-star"></i>
                    <i class="fas fa-star-half-alt"></i>
                    <span class="ms-1">{toy.rating}</span>
                  </div>
                  <span class="text-muted">{toy.orders} orders</span>
                </div>

                <p class="text mb-4 mb-md-0">
                  Short description about the product goes here, for ex its
                  features. Lorem ipsum dolor sit amet with hapti you enter into
                  any new area of science, you almost lorem ipsum is great text
                  consectetur adipisicing
                </p>
              </div>
              <div class="col-xl-3 col-md-3 col-sm-5">
                <div class="d-flex flex-row align-items-center mb-1">
                  <h4 class="mb-1 me-1">$ {toy.price}</h4>
                  <span class="text-danger">
                    <s>$ {toy.oldprice}</s>
                  </span>
                </div>
                <h6 class="text-success">{toy.shipping}</h6>
                <div class="mt-4">
                  <button class="btn btn-primary shadow-0" type="button">
                    Buy on Amazon
                  </button>
                  {/* <a
                    href="#!"
                    class="btn btn-light border px-2 pt-2 icon-hover"
                  >
                    <i class="fas fa-heart fa-lg px-1"></i>
                  </a> */}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Toy
