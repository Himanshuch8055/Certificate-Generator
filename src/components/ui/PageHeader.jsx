export default function PageHeader({ title, description, action }) {
  return (
    <div className="mb-8 p-4 rounded-xl">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 sm:text-3xl">{title}</h1>
          {description && (
            <p className="mt-2 text-sm text-gray-500 sm:text-base">{description}</p>
          )}
        </div>
        {action && <div className="mt-4 sm:mt-0">{action}</div>}
      </div>
    </div>
  );
} 