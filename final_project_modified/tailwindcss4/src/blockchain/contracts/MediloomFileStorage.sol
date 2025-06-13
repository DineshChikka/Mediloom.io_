// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract MediloomFileStorage {
    struct FileRecord {
        address uploader;
        uint256 timestamp;
    }

    mapping(bytes32 => FileRecord) public files;

    event FileStored(bytes32 indexed fileHash, address indexed uploader, uint256 timestamp);

    function storeFileHash(bytes32 fileHash) external {
        require(files[fileHash].timestamp == 0, "File already exists");

        files[fileHash] = FileRecord({
            uploader: msg.sender,
            timestamp: block.timestamp
        });

        emit FileStored(fileHash, msg.sender, block.timestamp);
    }

    function verifyFile(bytes32 fileHash) external view returns (bool, address, uint256) {
        FileRecord memory record = files[fileHash];
        if (record.timestamp == 0) {
            return (false, address(0), 0);
        }
        return (true, record.uploader, record.timestamp);
    }
}
