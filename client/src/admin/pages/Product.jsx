import { useEffect, useState } from "react";
import { Pencil, Plus, Trash2, X } from "lucide-react";
import useProductStore from "../Store/prodectStore";

const emptyForm = {
  name: "",
  price: "",
  priceBought: "",
  category: "",
  description: "",
  image: "",
  tags: "",
};

const Product = () => {
  const {
    products,
    loading,
    error,
    getProducts,
    createProduct,
    updateProduct,
    deleteProduct,
    clearError,
  } = useProductStore();
  const [activeTab, setActiveTab] = useState("all");
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [form, setForm] = useState(emptyForm);
  const [formError, setFormError] = useState("");

  useEffect(() => {
    getProducts();
  }, [getProducts]);

  const openForm = (product = null) => {
    clearError();
    setFormError("");
    setEditingProduct(product);
    setIsFormOpen(true);
    setForm(
      product
        ? {
            name: product.name || "",
            price: product.price ?? "",
            priceBought: product.priceBought ?? "",
            category: product.category || "",
            description: product.description || "",
            image: product.image || "",
            tags: (product.tags || []).join(", "),
          }
        : emptyForm,
    );
  };

  const closeForm = () => {
    if (loading) return;
    setIsFormOpen(false);
    setEditingProduct(null);
    setForm(emptyForm);
    setFormError("");
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setFormError("");

    const productData = {
      name: form.name.trim(),
      price: form.price === "" ? undefined : Number(form.price),
      ...(form.priceBought === ""
        ? {}
        : { priceBought: Number(form.priceBought) }),
      category: form.category.trim(),
      description: form.description.trim(),
      image: form.image.trim(),
      tags: form.tags
        .split(",")
        .map((tag) => tag.trim())
        .filter(Boolean),
    };

    try {
      if (editingProduct) {
        await updateProduct(editingProduct._id, productData);
      } else {
        await createProduct(productData);
      }
      closeForm();
    } catch (saveError) {
      setFormError(
        saveError.response?.data?.message ||
          saveError.message ||
          "Could not save product.",
      );
    }
  };

  const handleDelete = async (product) => {
    const confirmed = window.confirm(
      `Delete "${product.name}"? This action cannot be undone.`,
    );
    if (!confirmed) return;

    clearError();
    try {
      await deleteProduct(product._id);
    } catch {
      // The store exposes the API error in its error state.
    }
  };

  const totalProducts = products.length;
  const totalPriceBought = products.reduce(
    (total, product) => total + (Number(product.price) || 0),
    0,
  );

  const tabs = [
    { id: "all", label: "All Products" },
    { id: "categories", label: "Categories" },
    { id: "tags", label: "Tags" },
  ];

  const inputClassName =
    "mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 text-sm text-gray-900 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100";

  return (
    <div className="space-y-8">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
          <p className="mt-1 text-gray-500">Manage and monitor your store.</p>
        </div>
        <button
          type="button"
          onClick={() => openForm()}
          className="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
        >
          <Plus size={18} aria-hidden="true" />
          Create new product
        </button>
      </div>

      <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
        <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
          <p className="text-sm text-gray-500">Total Products</p>
          <h2 className="mt-2 text-3xl font-bold text-gray-900">
            {totalProducts}
          </h2>
        </div>

        <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
          <p className="text-sm text-gray-500">Total Price Bought</p>
          <h2 className="mt-2 text-3xl font-bold text-gray-900">
            {totalPriceBought.toLocaleString()} DA
          </h2>
        </div>
      </div>

      {error && (
        <p role="alert" className="text-sm text-red-600">
          Could not complete the product request: {error}
        </p>
      )}

      <section className="rounded-xl border border-gray-200 bg-white shadow-sm">
        <div className="flex gap-6 border-b border-gray-200 px-6">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveTab(tab.id)}
              className={`border-b-2 py-4 text-sm font-medium transition-colors ${
                activeTab === tab.id
                  ? "border-blue-600 text-blue-600"
                  : "border-transparent text-gray-500 hover:text-gray-900"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <div className="p-6">
          {activeTab === "all" && (
            <div>
              <h3 className="mb-4 font-semibold text-gray-900">
                All Products ({totalProducts})
              </h3>

              {products.length === 0 ? (
                <p className="text-gray-500">
                  {loading ? "Loading products..." : "No products found."}
                </p>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-sm">
                    <thead className="border-b text-gray-500">
                      <tr>
                        <th scope="col" className="py-3 pr-4">Name</th>
                        <th scope="col" className="py-3 pr-4">Category</th>
                        <th scope="col" className="py-3 pr-4">Price</th>
                        <th scope="col" className="py-3 text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {products.map((product) => (
                        <tr key={product._id} className="border-b last:border-0">
                          <td className="py-4 pr-4 font-medium text-gray-900">
                            {product.name}
                          </td>
                          <td className="py-4 pr-4 text-gray-500">
                            {product.category || "Uncategorized"}
                          </td>
                          <td className="py-4 pr-4">
                            {Number(product.price || 0).toLocaleString()} DA
                          </td>
                          <td className="py-4">
                            <div className="flex justify-end gap-2">
                              <button
                                type="button"
                                onClick={() => openForm(product)}
                                aria-label={`Edit ${product.name}`}
                                title="Edit product"
                                className="rounded-md p-2 text-blue-600 transition hover:bg-blue-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-blue-600"
                              >
                                <Pencil size={17} aria-hidden="true" />
                              </button>
                              <button
                                type="button"
                                onClick={() => handleDelete(product)}
                                aria-label={`Delete ${product.name}`}
                                title="Delete product"
                                disabled={loading}
                                className="rounded-md p-2 text-red-600 transition hover:bg-red-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-red-600 disabled:cursor-not-allowed disabled:opacity-50"
                              >
                                <Trash2 size={17} aria-hidden="true" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          )}

          {activeTab === "categories" && (
            <div>
              <h3 className="mb-4 font-semibold">Categories</h3>
              {[...new Set(products.map((product) => product.category).filter(Boolean))].map(
                (category) => (
                  <div key={category} className="border-b py-3 last:border-0">
                    {category}
                  </div>
                ),
              )}
            </div>
          )}

          {activeTab === "tags" && (
            <div>
              <h3 className="mb-4 font-semibold">Tags</h3>
              <div className="flex flex-wrap gap-2">
                {[...new Set(products.flatMap((product) => product.tags || []))].map(
                  (tag) => (
                    <span
                      key={tag}
                      className="rounded-full bg-gray-100 px-3 py-1 text-sm"
                    >
                      {tag}
                    </span>
                  ),
                )}
              </div>
            </div>
          )}
        </div>
      </section>

      {isFormOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-gray-950/50 p-4"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) closeForm();
          }}
        >
          <section
            role="dialog"
            aria-modal="true"
            aria-labelledby="product-form-title"
            className="my-auto w-full max-w-xl rounded-xl bg-white p-6 shadow-xl"
          >
            <div className="mb-5 flex items-center justify-between gap-4">
              <h2 id="product-form-title" className="text-xl font-bold text-gray-900">
                {editingProduct ? "Edit product" : "Create new product"}
              </h2>
              <button
                type="button"
                onClick={closeForm}
                aria-label="Close form"
                disabled={loading}
                className="rounded-md p-2 text-gray-500 hover:bg-gray-100 hover:text-gray-900 disabled:opacity-50"
              >
                <X size={20} aria-hidden="true" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <label className="block text-sm font-medium text-gray-700">
                Product name *
                <input
                  required
                  autoFocus
                  maxLength={120}
                  value={form.name}
                  onChange={(event) =>
                    setForm((current) => ({ ...current, name: event.target.value }))
                  }
                  className={inputClassName}
                />
              </label>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <label className="block text-sm font-medium text-gray-700">
                  Price (DA)
                  <input
                    type="number"
                    min="0"
                    step="any"
                    value={form.price}
                    onChange={(event) =>
                      setForm((current) => ({ ...current, price: event.target.value }))
                    }
                    className={inputClassName}
                  />
                </label>
                <label className="block text-sm font-medium text-gray-700">
                  Price bought (DA)
                  <input
                    type="number"
                    min="0"
                    step="any"
                    value={form.priceBought}
                    onChange={(event) =>
                      setForm((current) => ({
                        ...current,
                        priceBought: event.target.value,
                      }))
                    }
                    className={inputClassName}
                  />
                </label>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Category
                  <input
                    value={form.category}
                    onChange={(event) =>
                      setForm((current) => ({ ...current, category: event.target.value }))
                    }
                    className={inputClassName}
                  />
                </label>
              </div>

              <label className="block text-sm font-medium text-gray-700">
                Image URL
                <input
                  type="url"
                  value={form.image}
                  onChange={(event) =>
                    setForm((current) => ({ ...current, image: event.target.value }))
                  }
                  className={inputClassName}
                />
              </label>

              <label className="block text-sm font-medium text-gray-700">
                Tags
                <input
                  value={form.tags}
                  onChange={(event) =>
                    setForm((current) => ({ ...current, tags: event.target.value }))
                  }
                  placeholder="Gaming, GPU, NVIDIA"
                  className={inputClassName}
                />
                <span className="mt-1 block text-xs font-normal text-gray-500">
                  Separate tags with commas.
                </span>
              </label>

              <label className="block text-sm font-medium text-gray-700">
                Description
                <textarea
                  rows={3}
                  value={form.description}
                  onChange={(event) =>
                    setForm((current) => ({
                      ...current,
                      description: event.target.value,
                    }))
                  }
                  className={inputClassName}
                />
              </label>

              {formError && (
                <p role="alert" className="text-sm text-red-600">
                  Could not save product: {formError}
                </p>
              )}

              <div className="flex justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={closeForm}
                  disabled={loading}
                  className="rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700 disabled:cursor-wait disabled:opacity-60"
                >
                  {loading
                    ? "Saving..."
                    : editingProduct
                      ? "Save changes"
                      : "Create product"}
                </button>
              </div>
            </form>
          </section>
        </div>
      )}
    </div>
  );
};

export default Product;
