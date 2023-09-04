import { SideNav } from "@/components"

const GenPaymentLink = () => {
    return (
        <main className="flex">
            <SideNav/>
            <div className="flex justify-center items-center p-12">
                <div className="grid justify-center items-center bg-[#f7f7f7] p-7">
                    <form className="space-y-4">
                        <input
                            type="text"
                            placeholder="Payment Name"
                            id="payment-name"
                            name="payment-name"
                            value={""}
                            onChange={""}
                            required
                            className="px-4 py-2 rounded-lg border focus:ring focus:ring-blue-300"
                        />

                        <input
                            type="text"
                            placeholder="Description"
                            id="description"
                            name="description"
                            value={""}
                            onChange={""}
                            required
                            className="px-4 py-2 rounded-lg border focus:ring focus:ring-blue-300"
                        />

                        <input
                            type="number"
                            placeholder="Amount"
                            id="amount"
                            name="amount"
                            value={""}
                            onChange={""}
                            required
                            className="px-4 py-2 rounded-lg border focus:ring focus:ring-blue-300"
                        />

                        <input
                            type="number"
                            placeholder="Payment ID"
                            id="paymentID"
                            name="paymentID"
                            value={""}
                            onChange={""}
                            required
                            className="px-4 py-2 rounded-lg border focus:ring focus:ring-blue-300"
                        />

                        <div className="mb-6">
                            <button type="submit" className="py-2 text-white text-lg bg-blue-500 rounded-lg hover:bg-blue-600">
                                Create Link
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </main>
    )
}

export default GenPaymentLink