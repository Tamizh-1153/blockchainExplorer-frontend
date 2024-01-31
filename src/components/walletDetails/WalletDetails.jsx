import { useMutation, useQuery } from "@tanstack/react-query"
import React from "react"
import { useNavigate, useParams } from "react-router-dom"
import { getWalletDetails } from "../../api/posts"
import {
  Flex,
  Table,
  TableTbody,
  TableTd,
  TableTh,
  TableThead,
  TableTr,
} from "@mantine/core"
import { truncate } from "lodash"
import moment from "moment"
import "./walletDetails.css"

const WalletDetails = () => {
  const { id } = useParams()
  const refresh = useNavigate()

  const { data, isLoading, isError } = useQuery({
    queryKey: [id],
    queryFn: () => getWalletDetails(id),
  })
  console.log(data, isLoading, isError)

  if (isLoading) {
    return <div>Loading...</div>
  }

  return (
    <div>
      <div className="overview_container">
        <div>
          <h5>Overview</h5>
          <Flex gap={"sm"} direction={"column"}>
            <Flex direction={"column"}>
              <span className="overview_span">ETH balance:</span>
              <span className="secondary">{data?.wallet.nativeBal} ETH</span>
            </Flex>
            <Flex direction={"column"}>
              <span className="overview_span">ETH value:</span>
              <span className="secondary">${data?.wallet.ethValue}</span>
            </Flex>
            <Flex direction={"column"}>
              <span className="overview_span">ERC20 token balance:</span>
              <span className="secondary">
                {data?.wallet.ERC20TokenBalance}
              </span>
            </Flex>
          </Flex>
        </div>
      </div>
      <Table>
        <TableThead>
          <TableTr>
            <TableTh>Transaction Hash</TableTh>
            <TableTh>Block</TableTh>
            <TableTh>Age</TableTh>
            <TableTh>From</TableTh>
            <TableTh>To</TableTh>
            <TableTh>Value</TableTh>
          </TableTr>
        </TableThead>
        <TableTbody>
          {data?.wallet.transactions.map((item, i) => {
            return (
              <TableTr key={i}>
                <TableTd
                  className="link"
                  onClick={() => refresh(`/hash/${item.hash}`)}
                >
                  {truncate(item.hash, { length: 12 })}
                </TableTd>
                <TableTd>{item.block_number}</TableTd>
                <TableTd>{moment(item.block_timestamp).fromNow()}</TableTd>
                <TableTd
                  className="link"
                  onClick={() => refresh(`/address/${item.from_address}`)}
                >
                  {truncate(item.from_address, { length: 8 })}
                </TableTd>
                <TableTd
                  className="link"
                  onClick={() => refresh(`/address/${item.to_address}`)}
                >
                  {truncate(item.to_address, { length: 8 })}
                </TableTd>
                <TableTd>{`${(item.value / 10 ** 18).toFixed(5)}ETH`}</TableTd>
              </TableTr>
            )
          })}
        </TableTbody>
      </Table>
    </div>
  )
}

export default WalletDetails
