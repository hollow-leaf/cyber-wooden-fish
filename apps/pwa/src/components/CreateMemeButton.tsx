import { useAccount, useWriteContract } from "wagmi";
import { TokenFactory } from "../../pkg/contracts/TokenFactory"

interface CreateMemeButtonProps {
    name: string
    symbol: string
    imageUrl: string
    description: string
}

export function CreateMemeButton({ name, symbol, imageUrl, description }: CreateMemeButtonProps) {

    const { isConnected } = useAccount();

    const { writeContract, isError, failureReason } = useWriteContract()
    
    return (
        <div>
            {
                isConnected ?
                <button
                    onClick={() => {
                        console.log("Click!")
                        writeContract({
                            abi: TokenFactory["abi"],
                            address: "0x062b414E562ca0983c55D4731640e2E664cB96e2",
                            functionName: "createMemeToken",
                            args: [
                                name,
                                symbol,
                                imageUrl,
                                description
                            ]
                        })
                    }}
                >
                    Create
                </button>
                :
                <div>
                </div>
            }
            {
                isError && <div>{failureReason?.message}</div>
            }
        </div>
    )
}