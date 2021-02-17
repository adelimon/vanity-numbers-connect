#!/bin/bash
aws dynamodb get-item "$@" --table-name ContactFlow --key '{"Version": {"S": "Latest"}}' | jq -r .Item.ContactFlowJson.S > generatedContactFlow.json