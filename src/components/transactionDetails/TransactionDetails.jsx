import { useQuery } from '@tanstack/react-query';
import React from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { getTransactionByHash } from '../../api/posts';
import { Flex } from '@mantine/core';
import moment from 'moment';
import './transactionDetails.css'

const TransactionDetails = () => {
    const {id} = useParams()
    const refresh = useNavigate()

    const {data,isLoading,isError} = useQuery({
        queryKey:[id],
        queryFn:()=>getTransactionByHash(id)
    })
    console.log(data);
    if(isLoading) {
        <div>Loading...</div>
    }
  return (
    <div className="hash_container">
      <h4>Overview</h4>
      <Flex gap={"lg"} direction={"column"}>
        <Flex direction={"column"}>
          <span className="primary">Hash:</span>
          <span className="secondary">{data?.hash}</span>
        </Flex>
        <Flex direction={"column"}>
          <span className="primary">Block :</span>
          <span className="secondary">{data?.block_number}</span>
        </Flex>
        <Flex direction={"column"}>
          <span className="primary">Timestamp:</span>
          <span className="secondary">
            {moment(data?.block_timestamp).fromNow()}
          </span>
        </Flex>
        <Flex direction={"column"}>
          <span className="primary">From:</span>
          <span
            onClick={() => refresh(`/address/${data?.from_address}`)}
            className="secondary link"
          >
            {data?.from_address}
          </span>
        </Flex>
        <Flex direction={"column"}>
          <span className="primary">To:</span>
          <span
            onClick={() => refresh(`/address/${data?.to_address}`)}
            className="secondary link"
          >
            {data?.to_address}
          </span>
        </Flex>
        <Flex direction={"column"}>
          <span className="primary">Value:</span>
          <span className="secondary">{data?.value / 10 ** 18} ETH</span>
        </Flex>
        <Flex direction={"column"}>
          <span className="primary">Gas price:</span>
          <span className="secondary">
            {(data?.gas_price / 10 ** 18).toFixed(18)} ETH
          </span>
        </Flex>
      </Flex>
    </div>
  )
}

export default TransactionDetails