
import FormSubmitButton from "@/components/FormSubmitButton";

import { prisma } from "@/lib/db/prisma";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "@/lib/authOptions";

export const metadata = {
  title: "Add Product - Zamazon",
};

async function addProduct(formData: FormData) {
  "use server";

  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/api/auth/signin?callbackUrl=/app/product");
  }

  const name = formData.get("name")?.toString();
  const description = formData.get("description")?.toString();
  const imageUrl = formData.get("imageUrl")?.toString();
  const price = Number(formData.get("price") || 0);

  if (!name || !description || !imageUrl || !price) {
    throw Error("Missing required fields");
  }
for (let i = 0; i < 50; i++){
  await prisma.product.create({
    data: { name, description, imageUrl, price },
  });
}
  redirect("/");
}

export default async function AddProductPage() {
  const session = await getServerSession(authOptions);
  if (!session) {redirect("/api/auth/signin?callbackUrl=/app/product");}
  return (
    <div>
      <h1 className="mb-3 text-lg font-bold">Add Product</h1>

      <form action={addProduct}>
        <input
          className="md-3 w-full input input-bordered"
          required
          name="name"
          placeholder="Name"
        />

        <textarea
          required
          name="description"
          placeholder="Description"
          className="textarea-bordered textarea mb-3 w-full"
        />

        <input
          required
          name="imageUrl"
          placeholder="Image URL"
          type="url"
          className="input-bordered input mb-3 w-full"
        />
        <input
          required
          name="price"
          placeholder="Price"
          type="number"
          className="input-bordered input mb-3 w-full"
        />
        <FormSubmitButton className="btn-block">Add Product</FormSubmitButton>
      </form>
    </div>
  );
}
