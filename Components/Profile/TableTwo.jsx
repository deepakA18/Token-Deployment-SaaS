import React from "react";

const TableTwo = ({tableData, title}) => {
  return (
    <div className="row">
    <div className="col-xl-12 col-lg-12 col-md-12">
      <div className="send-money-form transection-log">
          <div className="form-text">
            <h4 className="form-top">
                {" "}
                {tableData.length == 0 
                ? "Support us"
              : `${title}`}{" "}
            </h4>
                {
                  tableData.length == 0 ? (
                    ""
                  ) : (
                    <div className="form-inner table-inner">
                      <table>
                        <thead>
                          <tr>
                            <th>Donation Id</th>
                            <th>Donor</th>
                            <th>Fund</th>
                          </tr>
                          <>
                          {
                            tableData?.map((token,i)=> (
                              <tr key={i+1}>
                                <td>#{token.donationId}</td>
                                <td>{token.donor.slice(0,55)}...</td>
                                <td>{token.fund} Bera</td>
                              </tr>
                            ))
                          }
                          </>
                        </thead>
                      </table>

                    </div>
                  )
                }
          </div>
      </div>
    </div>
  </div>
  )
};

export default TableTwo;
